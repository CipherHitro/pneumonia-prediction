from fastapi import FastAPI,File, UploadFile
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Flatten, Dense, Dropout, Input
from tensorflow.keras.applications import VGG16
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Reconstruct model architecture
base_model = VGG16(weights=None, include_top=False, input_shape=(224, 224, 3))
model = Sequential([
    Input(shape=(224, 224, 3)),
    base_model,
    Flatten(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])
# Load weights from the saved model avoiding Keras 3 serialization bugs
model.load_weights("ai.keras")

@app.get('/')
def home():
    return {'message': 'hello world!'}

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    # Convert image to RGB to ensure 3 channels
    image = Image.open(file.file).convert('RGB').resize((224, 224))  # VGG size
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction_prob = model.predict(img_array)[0][0]
    
    # Threshold for binary classification
    label = "Pneumonia" if prediction_prob > 0.5 else "Normal"
    # Ensure confidence score is corresponding to the selected label
    confidence = float(prediction_prob) if prediction_prob > 0.5 else float(1.0 - prediction_prob)

    return {
        "label": label,
        "confidence": confidence
    }