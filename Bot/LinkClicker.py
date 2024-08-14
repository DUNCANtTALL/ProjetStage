import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime, timedelta
import time
import random

# Configure logging
logging.basicConfig(filename='selenium_script.log', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

def init_driver():
    try:
        options = webdriver.ChromeOptions()
        options.add_argument("start-maximized")
        options.add_argument("disable-infobars")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        options.add_argument("--remote-allow-origins=*")
        
        service = ChromeService(executable_path="C:/Users/driss/OneDrive/Bureau/chromedriver.exe")
        driver = webdriver.Chrome(service=service, options=options)
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        logging.info("Driver initialized successfully.")
        return driver
    except Exception as e:
        logging.error(f"Error initializing driver: {e}")
        raise

def open_website(driver, url):
    try:
        driver.get(url)
        WebDriverWait(driver, 10).until(lambda d: d.execute_script('return document.readyState') == 'complete')
        logging.info(f"Opened website: {url}")
    except Exception as e:
        logging.error(f"Error opening website {url}: {e}")
        raise

def handle_cookie_popup(driver):
    try:
        cookie_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, 'hs-eu-confirmation-button'))
        )
        cookie_button.click()
        logging.info("Cookie popup handled.")
    except Exception:
        logging.info("Cookie popup not found or already handled.")

def click_canvas_lms(driver):
    try:
        wait = WebDriverWait(driver, 10)
        canvas_lms = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="hs_menu_wrapper_Navbar_with_Menu_"]/ul/li[2]/a')))
        driver.execute_script("arguments[0].scrollIntoView(true);", canvas_lms)
        time.sleep(random.uniform(0.5, 1.5))
        ActionChains(driver).move_to_element(canvas_lms).click().perform()
        logging.info("Clicked on Canvas LMS.")
    except Exception as e:
        logging.error(f"Error clicking Canvas LMS: {e}")
        raise

def fill_email(driver):
    try:
        wait = WebDriverWait(driver, 10)
        email = wait.until(EC.element_to_be_clickable((By.ID, 'i0116')))
        email.send_keys('bot@aui.ma')
        time.sleep(random.uniform(0.1, 0.3))
        submit = wait.until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
        submit.click()
        logging.info("Filled in email.")
    except Exception as e:
        logging.error(f"Error filling in email: {e}")
        raise

def fill_password(driver):
    try:
        wait = WebDriverWait(driver, 10)
        password = wait.until(EC.element_to_be_clickable((By.ID, 'i0118')))
        password.send_keys('Bot@123456789')
        time.sleep(random.uniform(0.1, 0.3))
        submit = wait.until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
        submit.click()
        logging.info("Filled in password.")
    except Exception as e:
        logging.error(f"Error filling in password: {e}")
        raise

def stay_connected(driver):
    try:
        wait = WebDriverWait(driver, 10)
        yes_button = wait.until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
        driver.execute_script("arguments[0].scrollIntoView(true);", yes_button)
        time.sleep(random.uniform(0.5, 1.5))
        ActionChains(driver).move_to_element(yes_button).click().perform()
        logging.info("Selected 'Stay signed in'.")
    except Exception as e:
        logging.error(f"Error in 'Stay signed in' step: {e}")
        raise

def open_attendance(driver):
    try:
        open_website(driver, "https://aui.instructure.com/accounts/1/external_tools/108")
        logging.info("Opened attendance page.")
    except Exception as e:
        logging.error(f"Error opening attendance page: {e}")
        raise

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
        logging.info("Filled in date input and submitted form.")
    except Exception as e:
        logging.error(f"Error filling date input: {e}")
        raise

def main1():
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
    except Exception as e:
        logging.error(f"An error occurred in the main flow: {e}")
    finally:
        driver.quit()
        logging.info("Driver quit successfully.")
