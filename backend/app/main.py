from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CYBERNEX AI Backend",
    version="1.0.0",
    description="Cyber Threat Intelligence & Defensive AI Analytics Engine",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/health")
async def health_check():
    return {
        "status": "online",
        "system": "CYBERNEX AI Core Engine",
        "version": "1.0.0"
    }
