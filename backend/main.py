import asyncio
import random
import pickle
import numpy as np
import pandas as pd
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shap

app = FastAPI(title="CyberNex AI Backend Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Trained XGBoost Model
try:
    with open("model.pkl", "rb") as f:
        model = pickle.load(f)
    explainer = shap.TreeExplainer(model)
except Exception as e:
    model = None
    explainer = None
    print(f"[!] Model load warning: {e}. Run train_model.py first.")

class TelemetryLog(BaseModel):
    id: str
    source_ip: str
    target_endpoint: str
    failed_logins: int
    payload_len: int
    sql_keywords: int
    is_internal_ip: int
    http_status: int

@app.get("/")
def health_check():
    return {"status": "online", "system": "CyberNex AI Engine", "model_loaded": model is not None}

@app.post("/api/predict")
def predict_threat(log: TelemetryLog):
    if model is None:
        return {"error": "Model not loaded"}

    features = pd.DataFrame([{
        'failed_logins': log.failed_logins,
        'payload_len': log.payload_len,
        'sql_keywords': log.sql_keywords,
        'is_internal_ip': log.is_internal_ip,
        'http_status': log.http_status
    }])

    prob = float(model.predict_proba(features)[0][1])
    shap_values = explainer.shap_values(features)[0]

    feature_names = ['failed_logins', 'payload_len', 'sql_keywords', 'is_internal_ip', 'http_status']
    shap_factors = [
        {"feature": name, "impact": float(val)}
        for name, val in zip(feature_names, shap_values)
    ]

    severity = "CRITICAL" if prob >= 0.8 else "HIGH" if prob >= 0.5 else "LOW"

    return {
        "log_id": log.id,
        "threat_probability": prob,
        "severity": severity,
        "shap_factors": shap_factors
    }

# Live WebSocket Log Streamer
@app.websocket("/ws/logs")
async def websocket_logs(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            await asyncio.sleep(2)
            mock_log = {
                "id": f"log-{random.randint(100, 999)}",
                "timestamp": pd.Timestamp.now().strftime("%H:%M:%S"),
                "source_ip": f"192.168.1.{random.randint(10, 250)}",
                "target_endpoint": random.choice(["/api/v1/login", "/api/v1/users", "/admin/db"]),
                "attack_type": random.choice(["SQL Injection", "Brute Force", "XSS Payload", "Normal Traffic"]),
                "severity": random.choice(["CRITICAL", "HIGH", "MEDIUM", "LOW"]),
                "raw_payload": "SELECT * FROM users WHERE '1'='1'"
            }
            await websocket.send_json(mock_log)
    except WebSocketDisconnect:
        print("Client disconnected from WebSocket stream")
