import os
import pandas as pd

def extract_and_save_data(input_file_path, output_file_path):
    df = pd.read_csv(input_file_path)
    extracted_df = df[['Course Code', 'SIS Student ID', 'Attendance', 'Class Date']]
       
    if os.path.exists(output_file_path):
        extracted_df.to_csv(output_file_path, mode='a', header=False, index=False)
    else:
        extracted_df.to_csv(output_file_path, mode='w', header=True, index=False)

