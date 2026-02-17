from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

app = FastAPI(title="Resume Scanner API")

# --- CORS Configuration (React connection ke liye) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # React ka address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Mock Logic (Dummy ML Model) ---
def analyze_text(text: str):
    # Yeh keywords hum dhoondhenge (Future mein ye model se replace hoga)
    target_skills = ["python", "java", "sql", "machine learning", "communication", "react", "fastapi"]
    
    text_lower = text.lower()
    found_skills = [skill for skill in target_skills if skill in text_lower]
    missing_skills = [skill for skill in target_skills if skill not in text_lower]
    
    # Score Calculation
    score = round((len(found_skills) / len(target_skills)) * 100, 2)
    
    return {
        "score": score,
        "found": found_skills,
        "missing": missing_skills
    }

@app.get("/")
def home():
    return {"message": "Resume Scanner API is Running"}

@app.post("/scan")
async def scan_resume(file: UploadFile = File(...)):
    # 1. Validation: Sirf PDF allow karein
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # 2. Read PDF
    try:
        content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
    except Exception as e:
        raise HTTPException(status_code=500, detail="Could not read PDF")

    # 3. Analyze (Mock Logic)
    result = analyze_text(text)

    # 4. Return Data
    return {
        "filename": file.filename,
        "score": result["score"],
        "found_skills": result["found"],
        "missing_skills": result["missing"]
    }