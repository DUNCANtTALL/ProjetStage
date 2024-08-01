import pandas as pd

def extract_attendance_data(input_file_path, output_file_path):
    # Read the original CSV file
    df = pd.read_csv(input_file_path)
    
    # Filter for 'absent' or 'late' attendance
    filtered_df = df[df['Attendance'].str.lower().isin(['absent', 'late'])]
    
    # Group by 'Course Code', 'SIS Student ID', and 'Attendance' and count the occurrences
    grouped_df = filtered_df.groupby(['Course Code', 'SIS Student ID', 'Attendance']).size().reset_index(name='Count') # type: ignore
    
    # Save the extracted data to a new CSV file
    grouped_df.to_csv(output_file_path, index=False)

# Example usage
input_file_path = 'proxy.csv'  # Replace with your input file path
output_file_path = 'output_file.csv'  # Replace with your output file path
extract_attendance_data(input_file_path, output_file_path)
