Yield Prediction Project
Setup

Install dependencies: pip install -r requirements.txt
Place dataSet.xlsx in the root directory
Run the application: python main.py

API Endpoints

POST /api/train: Train the model
POST /api/tune: Perform hyperparameter tuning
POST /api/cross-validate: Run cross-validation
POST /api/predict: Make predictions (send JSON with feature values)

Project Structure

app/: Flask application and core logic
data/: Data cleaning and preprocessing
models/: Machine learning model logic
services/: Business logic
api/: API routes
utils/: Visualization utilities

main.py: Entry point
requirements.txt: Dependencies
dataSet.xlsx: Input data (not included)

Usage

Ensure dataSet.xlsx is in the root directory
Run python main.py to train the model, generate visualizations, and start the Flask server
Use API endpoints to interact with the model
