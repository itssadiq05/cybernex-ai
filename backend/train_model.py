import numpy as np
import pandas as pd
import xgboost as xgb
import pickle

def train_and_save_model():
    print("[*] Generating synthetic cybersecurity telemetry dataset...")
    np.random.seed(42)
    n_samples = 2000

    # Features: [failed_logins, payload_len, sql_keywords, is_internal_ip, http_status]
    failed_logins = np.random.poisson(lam=5, size=n_samples)
    payload_len = np.random.randint(10, 500, size=n_samples)
    sql_keywords = np.random.binomial(n=5, p=0.2, size=n_samples)
    is_internal_ip = np.random.binomial(n=1, p=0.3, size=n_samples)
    http_status = np.random.choice([200, 401, 403, 500], size=n_samples)

    # Calculate probability label
    threat_score = (failed_logins * 0.2) + (sql_keywords * 0.4) - (is_internal_ip * 0.3) + (payload_len / 500)
    labels = (threat_score > 1.2).astype(int)

    X = pd.DataFrame({
        'failed_logins': failed_logins,
        'payload_len': payload_len,
        'sql_keywords': sql_keywords,
        'is_internal_ip': is_internal_ip,
        'http_status': http_status
    })

    print("[*] Training XGBoost Classifier...")
    model = xgb.XGBClassifier(n_estimators=50, max_depth=4, learning_rate=0.1)
    model.fit(X, labels)

    with open("model.pkl", "wb") as f:
        pickle.dump(model, f)
    
    print("[+] Model saved successfully to backend/model.pkl!")

if __name__ == "__main__":
    train_and_save_model()
