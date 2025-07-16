import { useState } from "react";
import axios from "axios";

function TrainModel() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrain = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://caminova.onrender.com/api/train",
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setResult(response.data);
    } catch (error) {
      if (error.response) {
        setError(
          `API Error: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        setError(
          "Error: Cannot connect to the Flask server. Ensure it's running at http://127.0.0.1:5000."
        );
      } else {
        setError(`Error: ${error.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          🏋️ Train Model
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4 text-sm sm:text-base">
          Train your machine learning model with the latest data
        </p>
      </div>

      <div className="space-y-6">
        <button
          onClick={handleTrain}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 disabled:text-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-yellow-400/50 disabled:hover:scale-100 disabled:hover:shadow-none text-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Training Model...
            </span>
          ) : (
            "🚀 Start Training"
          )}
        </button>

        {result && (
          <div className="p-6 bg-gradient-to-r from-black to-gray-900 text-yellow-400 rounded-xl border-l-4 border-yellow-400 shadow-lg">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">📈</span>
              <h3 className="text-xl font-bold">Training Results</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-400 mb-1">Mean Squared Error</p>
                <p className="text-2xl font-bold text-yellow-300">
                  {result.mse.toFixed(4)}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-400 mb-1">R² Score</p>
                <p className="text-2xl font-bold text-yellow-300">
                  {result.r2.toFixed(4)}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-400 mb-1">Accuracy</p>
                <p className="text-2xl font-bold text-yellow-300">
                  {result.accuracy.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-400 rounded-xl border-l-4 border-red-500 shadow-lg">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">⚠️</span>
              <h3 className="text-xl font-bold text-red-400">Training Error</h3>
            </div>
            <p className="text-red-300 text-sm sm:text-base">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainModel;
