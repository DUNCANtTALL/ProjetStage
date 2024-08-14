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
        current_time = datetime.now().strftime('%H:%M')
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
            time.sleep(30) 
            continue


def open_link_in_new_tab(driver):
    try:
        # Wait for the dynamic link to be present
        dynamic_link = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "//a[contains(@id, 'LPlnk')]"))
        )
        
        # Log action
        print("Dynamic link found, opening in new tab via JavaScript")
        
        # Use JavaScript to open the link in a new tab
        driver.execute_script("window.open(arguments[0].href, '_blank');", dynamic_link)
        
        # Switch to the new tab
        WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(2))
        driver.switch_to.window(driver.window_handles[-1])
        time.sleep(3)  # Adjust sleep time if needed
        
        # Log success
        print("Switched to the new tab successfully")
        
    except Exception as e:
        print(f"Error during JavaScript tab opening: {e}")

def click_dynamic_link(driver):
    try:
        open_link_in_new_tab(driver)
        time.sleep(1)  # Adjust sleep time if needed
    except Exception as e:
        print(f"Error: {e}")

def read_email_content(driver):
    try:
        content = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, '//div[@class="rps_12c"]')) 
        )
        print(content.text)
    except Exception as e:
        print(f"Error reading email content: {e}")



    
def main2(): 
    driver = init_driver()
    login_to_outlook(driver, 'bot@aui.ma', 'Bot@123456789')
    wait_for_email(driver)
    click_dynamic_link(driver)
    driver.quit()
   
