import pandas as pd

def remove_redundant_lines(file_path):
    # Read the original CSV file
    df = pd.read_csv(file_path)
    
    # Convert 'Class Date' to datetime to ensure proper comparison
    df['Class Date'] = pd.to_datetime(df['Class Date'])
    
    # Sort by 'Class Date' to ensure the latest dates are at the end
    df_sorted = df.sort_values(by='Class Date')
    
    # Drop duplicates, keeping the last occurrence (latest date) for each 'Course Code' and 'SIS Student ID'
    df_unique = df_sorted.drop_duplicates(subset=['Course Code', 'SIS Student ID'], keep='last')
    
    # Save the updated data back to the same file
    df_unique.to_csv(file_path, index=False)

# Example usage
file_path = 'proxy.csv' # Replace with your file path
remove_redundant_lines(file_path)
