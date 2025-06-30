# 🎧 Meeting/Audio Summarizer App

This project transcribes and summarizes audio files using FastAPI (backend) and Next.js (frontend).

---

## 🚀 Features

- 🎙️ Upload audio files (`.mp3`, `.wav`, etc.)
- 🔊 Transcribe audio using Whisper
- 🧠 Summarize transcripts using Mistral-7B via Hugging Face Inference API
- 🌐 Clean web interface built with Next.js

---

## 📦 Setup Instructions

### 1. 🖥️ Backend (FastAPI)

#### 📁 Location: `/backend`

**Requirements**:

- Python 3.9+
- Hugging Face API Token (`HF_TOKEN`)
- `ffmpeg` installed (required by Whisper)

#### 🔧 Installation (Local)

```bash
cd backend
python -m venv venv
venv\Scripts\activate # On Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
