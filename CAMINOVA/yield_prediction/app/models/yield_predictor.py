from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
import joblib
import numpy as np
from app.config import Config

class YieldPredictor:
    def __init__(self, random_state=42):
        self.model = RandomForestRegressor(random_state=random_state)
        self.random_state = random_state
        self.model_path = Config.MODEL_PATH

    def train(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=self.random_state)
        self.model.fit(X_train, y_train)
        return X_test, y_test

    def hyperparameter_tuning(self, X, y, param_grid=None):
        if param_grid is None:
            param_grid = {
                'n_estimators': [50, 100, 200],
                'max_depth': [None, 10, 20],
                'min_samples_split': [2, 5, 10],
                'min_samples_leaf': [1, 2, 4]
            }
        grid_search = GridSearchCV(self.model, param_grid, cv=5, scoring='neg_mean_squared_error', n_jobs=-1)
        grid_search.fit(X, y)
        self.model = grid_search.best_estimator_
        return grid_search.best_params_

    def cross_validate(self, X, y, cv=5):
        scores = cross_val_score(self.model, X, y, cv=cv, scoring='r2')
        return scores

    def predict(self, X):
        return self.model.predict(X)

    def save_model(self):
        joblib.dump(self.model, self.model_path)

    def load_model(self):
        self.model = joblib.load(self.model_path)

    def get_feature_importance(self, feature_names):
        return dict(zip(feature_names, self.model.feature_importances_))