from app.data.data_cleaner import DataCleaner
from app.models.yield_predictor import YieldPredictor
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np
import os
from app.config import Config

class PredictionService:
    def __init__(self):
        self.data_cleaner = DataCleaner()
        self.model = YieldPredictor()
        # Load the saved model if it exists, otherwise train a new one
        if os.path.exists(Config.MODEL_PATH):
            self.model.load_model()
        else:
            X, y = self.process_data()
            self.train_model(X, y)
            self.save_model()

    def process_data(self):
        df = self.data_cleaner.load_data()
        df = self.data_cleaner.clean_data(df)
        X, y = self.data_cleaner.prepare_features(df)
        return X, y

    def train_model(self, X, y):
        X_test, y_test = self.model.train(X, y)
        y_pred = self.model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        accuracy = 100 * (1 - (abs(y_pred - y_test) / y_test)).mean()
        return mse, r2, accuracy, y_test, y_pred

    def tune_model(self, X, y):
        best_params = self.model.hyperparameter_tuning(X, y)
        return best_params

    def cross_validate_model(self, X, y):
        scores = self.model.cross_validate(X, y)
        return scores

    def predict(self, input_data):
        return self.model.predict(input_data)

    def save_model(self):
        self.model.save_model()