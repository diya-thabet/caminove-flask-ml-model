from app import create_app
from app.services.prediction_services import PredictionService
from app.utils.visualisation import (
    plot_actual_vs_predicted,
    plot_residuals,
    plot_feature_importance,
    plot_error_histogram,
    plot_sorted_actual_vs_predicted,
    plot_error_boxplot,
    plot_confidence_vs_error
)

def main():
    app = create_app()
    prediction_service = PredictionService()
    
    # Process and train
    X, y = prediction_service.process_data()
    mse, r2, accuracy, y_test, y_pred = prediction_service.train_model(X, y)
    print(f"MSE: {mse:.4f}")
    print(f"R²: {r2:.4f}")
    print(f"Mean Relative Accuracy: {accuracy:.2f}%")
    
    # Hyperparameter tuning
    best_params = prediction_service.tune_model(X, y)
    print(f"Best parameters: {best_params}")
    
    # Cross-validation
    scores = prediction_service.cross_validate_model(X, y)
    print(f"Cross-validation R² scores: {scores}")
    print(f"Mean R²: {scores.mean():.4f}")
    
    # Save model
    prediction_service.save_model()
    print("Model saved as 'yield_predictor.pkl'")
    
    # Visualizations
    plot_actual_vs_predicted(y_test, y_pred)
    plot_residuals(y_test, y_pred)
    feature_importances = prediction_service.model.get_feature_importance(X.columns)
    plot_feature_importance(list(feature_importances.values()), list(feature_importances.keys()))
    plot_error_histogram(y_test, y_pred)
    plot_sorted_actual_vs_predicted(y_test, y_pred)
    plot_error_boxplot(y_test, y_pred)
    plot_confidence_vs_error(y_pred, y_test)
    
    # Run Flask app
    app.run(debug=True)

if __name__ == "__main__":
    main()