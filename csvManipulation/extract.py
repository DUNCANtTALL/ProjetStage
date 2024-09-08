import os
import pandas as pd

def extract_attendance_data(input_file_path, output_file_path):
    df = pd.read_csv(input_file_path)    
    filtered_df = df[df['Attendance'].str.lower().isin(['absent', 'late'])]   
    grouped_df = filtered_df.groupby(['Course Code', 'SIS Student ID', 'Attendance']).size().reset_index(name='Count')
    grouped_df = grouped_df.drop_duplicates()
    if os.path.exists(output_file_path):
        existing_df = pd.read_csv(output_file_path)        
        combined_df = pd.concat([existing_df, grouped_df], ignore_index=True)        
        combined_df = combined_df.drop_duplicates()        
        combined_df.to_csv(output_file_path, mode='w', header=True, index=False)
    else:
        grouped_df.to_csv(output_file_path, mode='w', header=True, index=False)
