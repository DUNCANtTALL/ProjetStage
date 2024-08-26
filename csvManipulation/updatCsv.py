import pandas as pd

def remove_redundant_lines(file_path):
    df = pd.read_csv(file_path)
    df['Class Date'] = pd.to_datetime(df['Class Date'])
    df_sorted = df.sort_values(by='Class Date')
    df_unique = df_sorted.drop_duplicates(subset=['Course Code', 'SIS Student ID'], keep='last')    
    df_unique.to_csv(file_path, index=False)

# Example usage

file_path = 'ProjetStage/csvManipulation/csvfiles/proxy.csv' # Replace with your file path
remove_redundant_lines(file_path)


