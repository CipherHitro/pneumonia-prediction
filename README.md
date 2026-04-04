# Pneumonia Prediction App

An AI-powered diagnostic assistance tool that detects Pneumonia from chest X-Ray images. This full-stack application allows users to upload an X-Ray image and get an instant preliminary detection analysis, indicating whether the scan is "Normal" or shows signs of "Pneumonia", along with a confidence score.

**Live Demo:** [pneumonia-prediction.mentalorbit.tech](https://pneumonia-prediction.mentalorbit.tech)

## 🚀 Tech Stack

### Frontend
- **React.js** (Bootstrapped with Vite)
- **Tailwind CSS** (For styling)
- **Fetch API** (For communicating with the backend)

### Backend
- **FastAPI** (High-performance Python web framework)
- **TensorFlow & Keras** (Deep learning framework used for the VGG16-based prediction model)
- **Pillow** (For image processing)
- **Uvicorn** (ASGI server for FastAPI)

---

## 📂 Project Structure

```text
.
├── backend/
│   ├── main.py                # FastAPI application & endpoints
│   ├── ai.keras               # Pre-trained deep learning model weights
│   ├── requirements.txt       # Python dependencies
│   └── ...                    
├── frontend/
│   ├── src/                   # React components & pages
│   ├── .env                   # Environment variables for frontend
│   ├── package.json           # Node.js dependencies
│   ├── vite.config.js         # Vite configuration
│   └── ...
└── README.md                  # Project documentation (this file)
```

---

## ⚙️ Setup & Installation

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)

### Clone the repo 
```bash
   git clone 
   ```
### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate
   
   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server using Uvicorn:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *The backend will run on `http://127.0.0.1:8000`*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary Node packages:
   ```bash
   npm install
   ```
3. Ensure you have a `.env` file in the `frontend` folder pointing to your backend:
   ```env
   VITE_BACKEND_URL=http://127.0.0.1:8000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on the port specified by Vite (usually `http://localhost:5173`)*

---

## 📡 API Endpoints

### `GET /`
- **Description:** Health check endpoint to verify backend status.
- **Response:** `{"message": "hello world!"}`

### `POST /api/predict`
- **Description:** Accepts an image file (chest X-Ray) and returns the ML model's prediction.
- **Body:** `multipart/form-data` (file)
- **Response:**
  ```json
  {
    "label": "Pneumonia",
    "confidence": 0.987
  }
  ```

---

## ⚠️ Disclaimer
This is for educational and research purposes only. It is **not** a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
