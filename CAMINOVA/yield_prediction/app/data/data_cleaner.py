import pandas as pd
from app.config import Config

class DataCleaner:
    def __init__(self, file_path=Config.DATA_FILE, sheet_name=Config.SHEET_NAME):
        self.file_path = file_path
        self.sheet_name = sheet_name

    def load_data(self):
        df = pd.read_excel(self.file_path, sheet_name=self.sheet_name)
        df.columns = df.iloc[0]
        df = df[1:]
        df = df.loc[:, ~df.columns.isnull()]
        df.columns = [str(col).strip() for col in df.columns]
        df = df.loc[:, ~df.columns.str.contains("Unnamed", na=False)]
        return df

    def clean_data(self, df):
        df['Age'] = df['Age'].astype(str).str.strip().map({'Y': 0, 'O': 1})
        for col in df.columns:
            if col != 'Age':
                df[col] = pd.to_numeric(df[col], errors='coerce')
        df = df.dropna(subset=['yield'])
        df = df.fillna(0)
        return df

    def prepare_features(self, df):
        X = df.drop(columns=['yield'])
        y = df['yield']
        return X, y