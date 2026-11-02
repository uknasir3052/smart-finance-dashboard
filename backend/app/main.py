from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
import app.models  # Ensures the models are registered with Base metadata

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Finance API",
    description="Backend service for transaction management and AI financial insights",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Smart Finance API"
    }