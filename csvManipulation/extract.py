import os
import pandas as pd

def extract_attendance_data(input_file_path, output_file_path):
    df = pd.read_csv(input_file_path)
    
    filtered_df = df[df['Attendance'].str.lower().isin(['absent', 'late'])]
    
    grouped_df = filtered_df.groupby(['Course Code', 'SIS Student ID', 'Attendance']).size().reset_index(name='Count') # type: ignore
    
    if os.path.exists(output_file_path):
        grouped_df.to_csv(output_file_path, mode='a', header=False, index=False)
    else:
        grouped_df.to_csv(output_file_path, mode='w', header=True, index=False)

# Example usage
input_file_path = 'ProjetStage/csvManipulation/csvfiles/proxy.csv'  # Replace with your input file path
output_file_path = 'ProjetStage/csvManipulation/csvfiles/output_file.csv'  # Replace with your output file path
extract_attendance_data(input_file_path, output_file_path)
