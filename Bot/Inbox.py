import time
from imapclient import IMAPClient
import email
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Email account credentials
EMAIL = 'drisshaj2004@gmail.com'
PASSWORD = '2004driss'
IMAP_SERVER = 'outlook.office365.com'

def get_latest_email():
    with IMAPClient(IMAP_SERVER) as client:
        client.login(EMAIL, PASSWORD)
        client.select_folder('INBOX')
        messages = client.search(['FROM', 'drisshaja@gmail.com']) # type: ignore
        
        if messages:
            for msg_id, data in client.fetch(messages, 'RFC822').items():
                msg = email.message_from_bytes(data[b'RFC822']) # type: ignore
                if 'Roll Call' in msg['from'] and 'You can download your report' in msg.get_payload():
                    return msg.get_payload()
        return None

def extract_download_link(email_content):
    link_pattern = re.compile(r'https://rollcall-production-s3-bucket-[\w-]+\.s3\.eu-west-1\.amazonaws\.com/[\w-?&=%]+')
    match = link_pattern.search(email_content)
    if match:
        return match.group(0)
    return None

def download_csv(download_link):
    driver = webdriver.Chrome() 
    driver.get(download_link)
    time.sleep(10) 
    driver.quit()

# Main script
while True:
    email_content = get_latest_email()
    if email_content:
        download_link = extract_download_link(email_content)
        if download_link:
            print(f"Download link found: {download_link}")
            download_csv(download_link)
            break
        else:
            print("Download link not found in the latest email.")
    else:
        print("No new relevant email found.")
    
    print("Waiting for a new email...")
    time.sleep(60) 
