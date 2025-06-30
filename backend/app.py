from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os
import whisper

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

whisper_model = whisper.load_model("base")

client = InferenceClient(
    provider="featherless-ai",
    api_key=HF_TOKEN,
)

@app.post("/summarize-audio")
async def summarize_audio(file: UploadFile = File(...)):

    audio_path = f"temp_{file.filename}"
    with open(audio_path, "wb") as f:
        f.write(await file.read())

    transcription = whisper_model.transcribe(audio_path)["text"]

    completion = client.chat.completions.create(
        model="mistralai/Mistral-7B-Instruct-v0.2",
        messages=[
            {"role": "user", "content": f"Summarize this transcript to  concise bullet points: {transcription}"}
        ],
    )

    summary = completion.choices[0].message.content

    os.remove(audio_path)

    return {"summary": summary, "transcription": transcription}
