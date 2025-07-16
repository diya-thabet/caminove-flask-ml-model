import matplotlib.pyplot as plt
import numpy as np

def plot_actual_vs_predicted(y_test, y_pred):
    plt.figure(figsize=(6, 5))
    plt.scatter(y_test, y_pred, color='blue', alpha=0.7)
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
    plt.xlabel("Actual Yield")
    plt.ylabel("Predicted Yield")
    plt.title("Actual vs Predicted Yield")
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('actual_vs_predicted.png')
    plt.close()

def plot_residuals(y_test, y_pred):
    residuals = y_test - y_pred
    plt.figure(figsize=(6, 5))
    plt.scatter(y_pred, residuals, color='green', alpha=0.7)
    plt.axhline(0, color='red', linestyle='--')
    plt.xlabel("Predicted Yield")
    plt.ylabel("Residuals")
    plt.title("Residuals vs Predicted")
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('residuals.png')
    plt.close()

def plot_feature_importance(importances, feature_names):
    # Convert importances to a NumPy array to ensure proper indexing
    importances = np.array(importances)
    indices = np.argsort(importances)
    plt.figure(figsize=(7, 5))
    plt.barh(range(len(indices)), importances[indices], align='center')
    plt.yticks(range(len(indices)), [feature_names[i] for i in indices])
    plt.xlabel("Feature Importance")
    plt.title("Random Forest Feature Importance")
    plt.tight_layout()
    plt.savefig('feature_importance.png')
    plt.close()

def plot_error_histogram(y_test, y_pred):
    errors = y_test - y_pred
    plt.figure(figsize=(6, 4))
    plt.hist(errors, bins=10, color='purple', edgecolor='black')
    plt.title("Histogram of Prediction Errors")
    plt.xlabel("Error (Actual - Predicted)")
    plt.ylabel("Frequency")
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('error_histogram.png')
    plt.close()

def plot_sorted_actual_vs_predicted(y_test, y_pred):
    sorted_idx = np.argsort(y_test.values)
    plt.figure(figsize=(7, 4))
    plt.plot(y_test.values[sorted_idx], label="Actual", marker='o')
    plt.plot(y_pred[sorted_idx], label="Predicted", marker='x')
    plt.title("Actual vs Predicted Yield (Sorted)")
    plt.xlabel("Sample")
    plt.ylabel("Yield")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('sorted_actual_vs_predicted.png')
    plt.close()

def plot_error_boxplot(y_test, y_pred):
    errors = y_test - y_pred
    plt.figure(figsize=(4, 5))
    plt.boxplot(errors, vert=True)
    plt.title("Boxplot of Prediction Errors")
    plt.ylabel("Residual (Actual - Predicted)")
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('error_boxplot.png')
    plt.close()

def plot_confidence_vs_error(y_pred, y_test):
    errors = abs(y_test - y_pred)
    plt.figure(figsize=(6, 4))
    plt.scatter(y_pred, errors, alpha=0.6, color='orange')
    plt.xlabel("Predicted Yield")
    plt.ylabel("Absolute Error")
    plt.title("Prediction Confidence vs Error")
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('confidence_vs_error.png')
    plt.close()