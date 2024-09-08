import pandas as pd

def remove_redundant_lines(file_path):
    df = pd.read_csv(file_path)
    # Drop duplicates based on the specified columns
    df_unique = df.drop_duplicates(subset=['Course Code', 'SIS Student ID', 'Class Date'], keep='first')
    df_unique.to_csv(file_path, index=False)
