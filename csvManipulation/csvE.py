import os
import pandas as pd

def extract_and_save_data(input_file_path, output_file_path):
    df = pd.read_csv(input_file_path)
    extracted_df = df[['Course Code', 'SIS Student ID', 'Attendance', 'Class Date']]
       
    if os.path.exists(output_file_path):
        extracted_df.to_csv(output_file_path, mode='a', header=False, index=False)
    else:
        extracted_df.to_csv(output_file_path, mode='w', header=True, index=False)

# Example usage
input_file_path = 'ProjetStage/csvManipulation/csvfiles/attendance_reports_attendance-015ccbd7-91bc-4ba2-bc16-235cd23ed6a2.csv'  # Replace with your input file path
output_file_path = 'ProjetStage/csvManipulation/csvfiles/proxy.csv'  # Replace with your output file path
extract_and_save_data(input_file_path, output_file_path)
