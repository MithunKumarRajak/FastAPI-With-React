from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 1. Import this

app = FastAPI()

# 2. Add React's URL to allowed origins
origins = [
    "http://localhost:5173",  # React (Vite) ka default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}