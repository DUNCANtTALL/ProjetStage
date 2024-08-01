from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime
import time

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

def login_to_outlook(driver, email, password):
    driver.get('https://outlook.live.com/owa/')
    time.sleep(3)
    
    sign_in_button = driver.find_element(By.XPATH, '//*[@id="mectrl_headerPicture"]')
    sign_in_button.click()
    time.sleep(3)
    
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

def wait_for_email(driver):
    wait = WebDriverWait(driver, 30)
    while True:
        current_time = "17:39"
        print(f"Checking for email at {current_time}")
        try:
            wait.until(
                EC.presence_of_element_located((By.XPATH, f"//span[@title='{current_time}']"))
            )
            email = driver.find_element(By.XPATH, f"//span[@title='{current_time}']")
            email.click()
            time.sleep(5)
            break
        except:
            time.sleep(30)  # Wait for 30 seconds before checking again
            continue

def click_dynamic_link(driver):
    try:
        dynamic_link = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "//a[contains(@id, 'LPlnk')]"))
        )
        # Execute JavaScript to remove the security attribute and click the link
        driver.execute_script("arguments[0].removeAttribute('onclick'); arguments[0].click();", dynamic_link)
        time.sleep(5)  # Adjust sleep time if needed
    except Exception as e:
        print(f"Error: {e}")

def read_email_content(driver):
    try:
        content = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, '//div[@class="rps_12c"]'))  # Adjust the XPath to target the email content
        )
        print(content.text)
    except Exception as e:
        print(f"Error reading email content: {e}")

if __name__ == "__main__":
    driver = init_driver()
    login_to_outlook(driver, 'bot@aui.ma', 'Bot@123456789')
    wait_for_email(driver)
    read_email_content(driver)
    click_dynamic_link(driver)
    driver.quit()
