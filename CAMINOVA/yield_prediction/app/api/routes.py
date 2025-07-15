from flask import Blueprint, request, jsonify
from ..services.prediction_services import PredictionService
import pandas as pd

api_bp = Blueprint('api', __name__)
prediction_service = PredictionService()

@api_bp.route('/train', methods=['POST'])
def train_model():
    X, y = prediction_service.process_data()
    mse, r2, accuracy, _, _ = prediction_service.train_model(X, y)
    prediction_service.save_model()
    return jsonify({
        'message': 'Model trained successfully',
        'mse': mse,
        'r2': r2,
        'accuracy': accuracy
    })

@api_bp.route('/tune', methods=['POST'])
def tune_model():
    X, y = prediction_service.process_data()
    best_params = prediction_service.tune_model(X, y)
    prediction_service.save_model()
    return jsonify({
        'message': 'Hyperparameters tuned successfully',
        'best_params': best_params
    })

@api_bp.route('/cross-validate', methods=['POST'])
def cross_validate():
    X, y = prediction_service.process_data()
    scores = prediction_service.cross_validate_model(X, y)
    return jsonify({
        'message': 'Cross-validation completed',
        'r2_scores': scores.tolist(),
        'mean_r2': scores.mean()
    })

@api_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_df = pd.DataFrame([data])
    prediction = prediction_service.predict(input_df)
    return jsonify({
        'prediction': prediction.tolist()
    })