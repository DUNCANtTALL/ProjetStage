import os
import glob

def get_latest_csv_file(download_folder):
    list_of_files = glob.glob(os.path.join(download_folder, '*.csv'))
    if not list_of_files:
        raise FileNotFoundError("No CSV files found in the download folder.")
    latest_file = max(list_of_files, key=os.path.getmtime)    
    return latest_file


