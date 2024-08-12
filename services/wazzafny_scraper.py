# wazzafny_scraper.py
import requests
from bs4 import BeautifulSoup

def scrape_wazzafny_jobs(search_query, location):
    url = f"https://wazzafny.com/job/search?keyword={search_query}&location={location}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = []
    for job in soup.find_all('div', class_='job-result'):
        job_title = job.find('h2', class_='title').text.strip()
        company = job.find('div', class_='company').text.strip()
        location = job.find('span', class_='location').text.strip()
        link = job.find('a')['href']
        jobs.append({"title": job_title, "company": company, "location": location, "link": link})
    return jobs
