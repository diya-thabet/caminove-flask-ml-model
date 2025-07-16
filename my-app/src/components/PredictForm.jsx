import { useState } from "react";
import axios from "axios";

function PredictForm() {
  const [formData, setFormData] = useState({
    Run: "",
    Rapport: "",
    cct: "",
    Days: "",
    Dimensions: "",
    "Degradation of epidermis%": "",
    Age: "0",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (key !== "Age" && (value === "" || isNaN(value))) {
        return `Please enter a valid number for ${key}.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://caminova.onrender.com/api/predict",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );
      setResult(response.data.prediction[0]);
    } catch (error) {
      if (error.response) {
        setError(
          `API Error: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        setError(
          "Error: Cannot connect to the Flask server. Ensure it’s running at http://127.0.0.1:5000."
        );
      } else {
        setError(`Error: ${error.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          🔮 Predict Yield
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {Object.keys(formData).map((key) => (
          <div key={key} className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-yellow-600 transition-colors">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            {key === "Age" ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 bg-white hover:border-gray-400 text-gray-700"
              >
                <option value="0">Young (Y)</option>
                <option value="1">Old (O)</option>
              </select>
            ) : (
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 bg-white hover:border-gray-400 text-gray-700 placeholder-gray-400"
                placeholder={`Enter ${key}`}
                step={key === "cct" ? "0.1" : "1"}
                required
              />
            )}
          </div>
        ))}

        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 mt-4">
          <button
            type="submit"
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
                Predicting...
              </span>
            ) : (
              "🚀 Predict Yield"
            )}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-r from-black to-gray-900 text-yellow-400 rounded-xl border-l-4 border-yellow-400 shadow-lg">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">📊</span>
            <h3 className="text-xl font-bold">Prediction Result</h3>
          </div>
          <p className="text-2xl font-mono">
            Predicted Yield:{" "}
            <span className="text-yellow-300 font-bold">
              {result.toFixed(2)}%
            </span>
          </p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-400 rounded-xl border-l-4 border-red-500 shadow-lg">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">⚠️</span>
            <h3 className="text-xl font-bold text-red-400">Error</h3>
          </div>
          <p className="text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}

export default PredictForm;
