# FastAPI + React Full Stack Project Guide

## 1. The Project Structure
**Rule:** Always keep your Backend and Frontend separated.

```plaintext
MyProject/
│
├── backend/                <-- FASTAPI WORKSPACE
│   ├── env/               (Virtual Environment)
│   ├── main.py             (Your API Code)
│   └── requirements.txt    (List of Python libraries)
│
└── frontend/               <-- REACT WORKSPACE
    ├── node_modules/       (React Libraries - auto-generated)
    ├── src/                (Where you write React code like App.jsx)
    └── package.json        (List of React libraries)

```

---

## 2. The Backend (FastAPI) Checklist

* **Location:** `cd backend`
* **Default Port:** `8000`

### Installation

```bash
pip install fastapi "uvicorn[standard]"

```

### To Run Server

```bash
python -m uvicorn main:app --reload

```

### ⚠️ Crucial Code: CORS

You **must** have this in `main.py` to allow React to talk to Python.

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # The React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

```

---

## 3. The Frontend (React) Checklist

* **Location:** `cd frontend` (Always `cd` here before running commands!)
* **Default Port:** `5173`

### Installation (First time only)

```bash
npm install

```

### To Run Server

```bash
npm run dev

```

### ⚠️ Crucial Code: Fetching Data

Use this inside `App.jsx` or your components to get data from Python.

```javascript
fetch("[http://127.0.0.1:8000/](http://127.0.0.1:8000/)")  // Ensure URL matches Python Backend
  .then(res => res.json())
  .then(data => console.log(data))

```

---

## 4. Top 3 "Don't Forget" Rules

### 1. Two Terminals

You must have **two separate terminals** open and running at the same time:

1. One for **Python** (`uvicorn`)
2. One for **React** (`npm`)

### 2. The `cd` Trap

React commands (`npm install`, `npm run`) **only work** if you are inside the `frontend` folder.

> **Correct:** `C:\MyProject\frontend> npm run dev`
> **Incorrect:** `C:\MyProject> npm run dev`

### 3. Address Check

If the connection stops working, check the ports in your browser address bar.

* Did React start on port **5174** instead of **5173**?
* If yes, update your `main.py` CORS origins list to match the new number.

---

**Congratulations on building your first Full Stack App!**
