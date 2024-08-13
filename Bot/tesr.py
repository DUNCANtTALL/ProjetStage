from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
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

    driver_path = ChromeDriverManager().install()
    print(f"ChromeDriver path: {driver_path}")

    # Ensure the path ends with 'chromedriver.exe'
    if not driver_path.endswith('chromedriver.exe'):
        raise Exception("ChromeDriver executable not found!")

    driver = webdriver.Chrome(service=ChromeService(driver_path), options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    return driver

if __name__ == "__main__":
    init_driver()
