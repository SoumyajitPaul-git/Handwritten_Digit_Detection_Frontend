export default function PredictionBox({ prediction, confidence }) {
  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 w-72 text-center">
      <h2 className="text-lg font-bold text-gray-800 mb-3">
        Prediction Result
      </h2>

      {prediction === null ? (
        <p className="text-gray-500">No prediction yet</p>
      ) : (
        <>
          <p className="text-5xl font-bold text-blue-600">{prediction}</p>

          {confidence !== null && (
            <p className="text-gray-600 text-sm mt-2">
              Confidence: {(confidence * 100).toFixed(1)}%
            </p>
          )}
        </>
      )}
    </div>
  );
}
