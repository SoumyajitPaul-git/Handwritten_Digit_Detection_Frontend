import React, { useState, useRef } from "react";
import CanvasBoard from "../components/CanvasBoard";
import Controls from "../components/Controls";
import PredictionBox from "../components/PredictionBox";

export default function DigitRecognizer() {
  const [brushSize, setBrushSize] = useState(18);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const clearRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  // Convert to 28×28 preview
  const updatePreview = async () => {
    const canvas = document.querySelector("canvas");

    const small = document.createElement("canvas");
    small.width = 28;
    small.height = 28;
    const ctx = small.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 28, 28);
    ctx.drawImage(canvas, 0, 0, 28, 28);

    setPreviewSrc(small.toDataURL());
  };

  const handlePredict = async () => {
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: previewSrc }),
    });

    const data = await res.json();
    setPrediction(data.digit);
    setConfidence(data.confidence ?? null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-300 flex justify-center items-center p-6">
      {/* Card */}
      <div className="bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 rounded-3xl p-10 w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">
          Handwritten Digit Recognizer
        </h1>

        <div className="flex gap-10 items-start">
          {/* Canvas */}
          <CanvasBoard
            brushSize={brushSize}
            onClearRef={clearRef}
            onCanvasChange={updatePreview}
          />

          {/* Preview Thumbnail */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-600 mb-3">28×28 Preview</p>
            <div className="w-28 h-28 bg-white border rounded-lg shadow-md flex items-center justify-center">
              {previewSrc ? (
                <img src={previewSrc} alt="preview" className="w-full h-full" />
              ) : (
                <span className="text-gray-400 text-xs">No preview</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <Controls
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          onClear={() => clearRef.current()}
          onPredict={handlePredict}
        />

        {/* Prediction */}
        <PredictionBox prediction={prediction} confidence={confidence} />
      </div>
    </div>
  );
}
