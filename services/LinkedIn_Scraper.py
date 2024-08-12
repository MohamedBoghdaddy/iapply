# linkedIn_scraper.py
import requests
from bs4 import BeautifulSoup

def scrape_linkedin_jobs(search_query, location):
    url = f"https://www.linkedin.com/jobs/search?keywords={search_query}&location={location}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = []
    for job in soup.find_all('div', class_='result-card__contents'):
        job_title = job.find('h3').text
        company = job.find('h4').text
        location = job.find('span', class_='job-result-card__location').text
        link = job.find('a')['href']
        jobs.append({"title": job_title, "company": company, "location": location, "link": link})
    return jobs
