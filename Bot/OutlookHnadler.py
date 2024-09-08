import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains
from datetime import datetime
import time

# Configure logging
logging.basicConfig(filename='script_log.log', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

def init_driver():
    logging.info("Initializing WebDriver")
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
    logging.info("WebDriver initialized successfully")
    return driver

def login_to_outlook(driver, email, password):
    logging.info("Logging into Outlook")
    driver.get("https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=159&ct=1725376817&rver=7.0.6738.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26cobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26deeplink%3dowa%252f%26RpsCsrfState%3db14a6f28-71e7-3903-2153-98add2a5a27f&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c")
    time.sleep(3)
    """""
    sign_in_button = driver.find_element(By.XPATH, '//*[@id="c-shellmenu_custom_outline_newtab_signin_bhvr100_right"]')
    sign_in_button.click()
    time.sleep(3)
    """

    email_input = driver.find_element(By.XPATH, '//*[@id="i0116"]')
    email_input.send_keys(email)
    email_input.send_keys(Keys.RETURN)
    time.sleep(3)
    
    password_input = driver.find_element(By.ID, 'i0118')
    password_input.send_keys(password)
    password_input.send_keys(Keys.RETURN)
    time.sleep(3)
    
    stay_signed_in_button = driver.find_element(By.ID, 'idSIButton9')
    stay_signed_in_button.click()
    time.sleep(5)
    logging.info("Logged into Outlook successfully")

def wait_for_email(driver):
    wait = WebDriverWait(driver, 30)
    while True:
        current_time = datetime.now().strftime('%H:%M')
        logging.info(f"Checking for email at {current_time}")
        try:
            wait.until(
                EC.presence_of_element_located((By.XPATH, f"//span[@title='{current_time}']"))
            )
            email = driver.find_element(By.XPATH, f"//span[@title='{current_time}']")
            email.click()
            time.sleep(5)
            logging.info("Email found and opened")
            break
        except Exception as e:
            logging.warning(f"No email found at {current_time}, retrying: {e}")
            time.sleep(30)
            continue

def open_link_in_new_tab(driver):
    try:
        logging.info("Searching for dynamic link")
        dynamic_link = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "//a[contains(@id, 'LPlnk')]"))
        )
        logging.info("Dynamic link found, opening in new tab ")
        driver.execute_script("window.open(arguments[0].href, '_blank');", dynamic_link)
        
        WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(2))
        driver.switch_to.window(driver.window_handles[-1])
        time.sleep(3)
        logging.info("Switched to the new tab successfully")
        logging.info("Csv file was installed successfully")

        
    except Exception as e:
        logging.error(f"Error during tab opening: {e}")

def click_dynamic_link(driver):
    try:
        open_link_in_new_tab(driver)
        time.sleep(1)
    except Exception as e:
        logging.error(f"Error: {e}")

def read_email_content(driver):
    try:
        content = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, '//div[@class="rps_12c"]')) 
        )
        logging.info(f"Email content read successfully: {content.text}")
    except Exception as e:
        logging.error(f"Error reading email content: {e}")

def main2():
    logging.info("Starting main2 function")
    driver = init_driver()
    try:
        login_to_outlook(driver, 'bot@aui.ma', 'Bot@123456789')
        wait_for_email(driver)
        click_dynamic_link(driver)
        time.sleep(5)
        read_email_content(driver)
    except Exception as e:
        logging.error(f"Error during script execution: {e}")
    finally:
        driver.quit()
        logging.info("Driver closed, script finished")
