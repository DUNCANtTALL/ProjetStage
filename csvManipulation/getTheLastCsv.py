import os
import glob

def get_latest_csv_file(download_folder):
    # Get a list of all CSV files in the download directory
    list_of_files = glob.glob(os.path.join(download_folder, '*.csv'))
    
    if not list_of_files:
        raise FileNotFoundError("No CSV files found in the download folder.")
    
    # Get the latest file by modification time
    latest_file = max(list_of_files, key=os.path.getmtime)
    
    return latest_file

# Example usage
download_folder = "C:/Users/driss/Downloads" 
latest_csv_file = get_latest_csv_file(download_folder)
print(f"Latest CSV file: {latest_csv_file}")
