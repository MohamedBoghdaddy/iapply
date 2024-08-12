# glassdoor_scraper.py
import requests
from bs4 import BeautifulSoup

def scrape_glassdoor_jobs(search_query, location):
    url = f"https://www.glassdoor.com/Job/jobs.htm?sc.keyword={search_query}&locT=C&locId={location}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = []
    for job in soup.find_all('div', class_='jobContainer'):
        job_title = job.find('a', class_='jobLink').text.strip()
        company = job.find('div', class_='jobInfoItem jobEmpolyerName').text.strip()
        location = job.find('span', class_='subtle loc').text.strip()
        link = "https://www.glassdoor.com" + job.find('a', class_='jobLink')['href']
        jobs.append({"title": job_title, "company": company, "location": location, "link": link})
    return jobs
