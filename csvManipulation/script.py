






from csvE import extract_and_save_data
from extract import extract_attendance_data
from getTheLastCsv import get_latest_csv_file
from updatCsv import remove_redundant_lines


if __name__ == "__main__":

    download_folder = "C:/Users/driss/Downloads" 
    latest_csv_file = get_latest_csv_file(download_folder)
    ##### 
    output="C:/Users/driss/OneDrive/Bureau/stage/ProjetStage/Dashboard/Backend/csv/output_file.csv"
    proxy = 'ProjetStage/csvManipulation/csvfiles/proxy.csv' 
    extract_and_save_data(latest_csv_file, proxy)
    remove_redundant_lines(proxy)
    extract_attendance_data(proxy, output)



   

