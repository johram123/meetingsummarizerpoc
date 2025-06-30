"use client";

import { useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("audio");
    const file = fileInput?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setSummary("");
    setTranscript("");

    try {
      const res = await fetch("http://localhost:8000/summarize-audio", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setTranscript(data.transcription || "No transcript found");
      setSummary(data.summary || "No summary generated");
    } catch (err) {
      setSummary("Error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Audio Summarizer
        </h1>

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            id="audio"
            accept="audio/*"
            className="block text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            disabled={loading}
          >
            {loading ? "Processing..." : "Upload & Summarize"}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Transcript:
            </h2>
            <div className="bg-gray-100 rounded p-4 whitespace-pre-wrap text-sm text-black">
              {transcript}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Summary:
            </h2>
            <div className="bg-gray-100 rounded p-4 whitespace-pre-wrap text-sm text-black">
              {summary}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
