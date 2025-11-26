export default function Controls({
  brushSize,
  setBrushSize,
  onClear,
  onPredict,
}) {
  return (
    <div className="flex flex-col gap-6 mt-6 items-center">
      {/* Brush Size Slider */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-gray-600">
          Brush Size: {brushSize}px
        </span>
        <input
          type="range"
          min="5"
          max="40"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-56 accent-blue-600"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-6">
        <button
          onClick={onClear}
          className="px-6 py-2 rounded-lg bg-red-500 text-white shadow hover:bg-red-600 active:scale-95 transition"
        >
          Clear
        </button>
        <button
          onClick={onPredict}
          className="px-6 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 active:scale-95 transition"
        >
          Predict
        </button>
      </div>
    </div>
  );
}
