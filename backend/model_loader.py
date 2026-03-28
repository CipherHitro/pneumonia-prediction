import os
import boto3
from tensorflow.keras.models import load_model
from dotenv import load_dotenv

load_dotenv()

MODE = os.getenv("MODE")

MODEL_PATH = "ai.keras"

def download_from_s3():
    print("Downloading model from S3...")

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
        aws_secret_access_key=os.getenv("AWS_SECRET_KEY"),
        region_name=os.getenv("AWS_REGION")
    )

    s3.download_file(
        os.getenv("S3_BUCKET"),
        os.getenv("S3_MODEL_KEY"),
        MODEL_PATH
    )

    print("Download complete")

def load_model_properly():
    # If production → download first
    if MODE == "production":
        if not os.path.exists(MODEL_PATH):
            download_from_s3()

    # Check file exists
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("Model file not found!")

    print("Loading model...")
    try:
        model = load_model(MODEL_PATH)
    except Exception as e:
        print(f"Standard load_model failed ({e}), attempting to rebuild architecture and load weights...")
        from tensorflow.keras.models import Sequential
        from tensorflow.keras.layers import Flatten, Dense, Dropout
        from tensorflow.keras.applications import VGG16
        
        base_model = VGG16(weights=None, include_top=False, input_shape=(224, 224, 3))
        model = Sequential([
            base_model,
            Flatten(),
            Dense(256, activation="relu"),
            Dropout(0.5),
            Dense(1, activation="sigmoid")
        ])
        model.load_weights(MODEL_PATH)

    print("Model loaded successfully")

    return model