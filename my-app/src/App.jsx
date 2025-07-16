import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import PredictForm from "./components/PredictForm";
import TrainModel from "./components/TrainModel";
import TuneModel from "./components/TuneModel";
import CrossValidate from "./components/CrossValidate";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex flex-col font-sans items-center justify-center">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-black to-gray-900 text-yellow-300 shadow-xl border-b-4 border-yellow-400 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-2 sm:space-y-0 py-4">
              <NavLink
                to="/predict"
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-center transition-all duration-300 font-medium text-sm sm:text-base transform hover:scale-105 ${
                    isActive
                      ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/50"
                      : "text-yellow-300 hover:bg-gray-800 hover:shadow-md"
                  }`
                }
              >
                🔮 Predict Yield
              </NavLink>
              <NavLink
                to="/train"
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-center transition-all duration-300 font-medium text-sm sm:text-base transform hover:scale-105 ${
                    isActive
                      ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/50"
                      : "text-yellow-300 hover:bg-gray-800 hover:shadow-md"
                  }`
                }
              >
                🏋️ Train Model
              </NavLink>
              <NavLink
                to="/tune"
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-center transition-all duration-300 font-medium text-sm sm:text-base transform hover:scale-105 ${
                    isActive
                      ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/50"
                      : "text-yellow-300 hover:bg-gray-800 hover:shadow-md"
                  }`
                }
              >
                ⚙️ Tune Model
              </NavLink>
              <NavLink
                to="/cross-validate"
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-center transition-all duration-300 font-medium text-sm sm:text-base transform hover:scale-105 ${
                    isActive
                      ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/50"
                      : "text-yellow-300 hover:bg-gray-800 hover:shadow-md"
                  }`
                }
              >
                ✅ Cross-Validate
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 w-full">
          <div className="w-full max-w-7xl mx-auto">
            <Routes>
              <Route path="/predict" element={<PredictForm />} />
              <Route path="/train" element={<TrainModel />} />
              <Route path="/tune" element={<TuneModel />} />
              <Route path="/cross-validate" element={<CrossValidate />} />
              <Route path="/" element={<PredictForm />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
