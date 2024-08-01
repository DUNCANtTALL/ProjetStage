import time
import random
from datetime import datetime, timedelta
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager

def init_driver():
    options = webdriver.ChromeOptions()
    options.add_argument("start-maximized")
    options.add_argument("disable-infobars")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    options.add_argument("--remote-allow-origins=*")
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    return driver

def open_website(driver, url):
    driver.get(url)
    WebDriverWait(driver, 10).until(lambda d: d.execute_script('return document.readyState') == 'complete')

def handle_cookie_popup(driver):
    try:
        cookie_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, 'hs-eu-confirmation-button'))
        )
        cookie_button.click()
    except Exception:
        print("Cookie pop-up not found or already handled.")

def click_canvas_lms(driver):
    wait = WebDriverWait(driver, 10)
    canvas_lms = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="hs_menu_wrapper_Navbar_with_Menu_"]/ul/li[2]/a')))
    driver.execute_script("arguments[0].scrollIntoView(true);", canvas_lms)
    time.sleep(random.uniform(0.5, 1.5))
    ActionChains(driver).move_to_element(canvas_lms).click().perform()

def fill_email(driver):
    wait = WebDriverWait(driver, 10)
    email = wait.until(EC.element_to_be_clickable((By.ID, 'i0116')))
    email.send_keys('bot@aui.ma')
    time.sleep(random.uniform(0.1, 0.3))
    submit = wait.until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
    submit.click()

def fill_password(driver):
    wait = WebDriverWait(driver, 10)
    password = wait.until(EC.element_to_be_clickable((By.ID, 'i0118')))
    password.send_keys('Bot@123456789')
    time.sleep(random.uniform(0.1, 0.3))
    submit = wait.until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
    submit.click()

def stay_connected(driver):
    wait = WebDriverWait(driver, 10)
    yes_button = wait.until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
    driver.execute_script("arguments[0].scrollIntoView(true);", yes_button)
    time.sleep(random.uniform(0.5, 1.5))
    ActionChains(driver).move_to_element(yes_button).click().perform()

def open_attendance(driver):
    open_website(driver, "https://aui.instructure.com/accounts/1/external_tools/108")

def fill_input_date(driver):
    try:
        wait = WebDriverWait(driver, 10)
        iframe = wait.until(EC.presence_of_element_located((By.XPATH, "//iframe[starts-with(@id, 'tool_content_')]")))
        driver.switch_to.frame(iframe)

        current_date = datetime.now()
        start_date = current_date.strftime('%d/%m/%Y')
        end_date = (current_date + timedelta(days=7)).strftime('%d/%m/%Y')

        start_date_input = driver.find_element(By.ID, 'report_start_date')
        start_date_input.click()
        start_date_input.clear()
        start_date_input.send_keys(start_date)

        time.sleep(3)

        end_date_input = driver.find_element(By.ID, 'report_end_date')
        end_date_input.click()
        end_date_input.clear()
        end_date_input.send_keys(end_date)
        
        time.sleep(3)
        submit_button = driver.find_element(By.XPATH, "//input[@value='Run report']")
        submit_button.click()

        wait.until(EC.visibility_of_element_located((By.ID, 'some_element_on_confirmation_page')))
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    driver = init_driver()
    try:
        open_website(driver, "https://aui.ma/")
        handle_cookie_popup(driver)
        click_canvas_lms(driver)
        fill_email(driver)
        fill_password(driver)
        stay_connected(driver)
        open_attendance(driver)
        fill_input_date(driver)
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
