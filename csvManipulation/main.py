from ProjetStage.csvManipulation.csvE import extract_and_save_data
from ProjetStage.csvManipulation.extract import extract_attendance_data
from ProjetStage.csvManipulation.getTheLastCsv import get_latest_csv_file
from ProjetStage.csvManipulation.updatCsv import remove_redundant_lines


if __name__ == "__main__":
    download_folder = "C:/Users/driss/Downloads" 
    latest_csv_file = get_latest_csv_file(download_folder)
    ##### 
    output="output.csv"
    proxy = 'proxy.csv' 
    extract_and_save_data(latest_csv_file, proxy)
    remove_redundant_lines(proxy)
    extract_attendance_data(proxy, output)



   

