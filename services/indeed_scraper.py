# indeed_scraper.py
import requests
from bs4 import BeautifulSoup

def scrape_indeed_jobs(search_query, location):
    url = f"https://www.indeed.com/jobs?q={search_query}&l={location}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = []
    for job in soup.find_all('div', class_='jobsearch-SerpJobCard'):
        job_title = job.find('h2').text.strip()
        company = job.find('span', class_='company').text.strip()
        location = job.find('div', class_='location').text.strip()
        link = "https://www.indeed.com" + job.find('a')['href']
        jobs.append({"title": job_title, "company": company, "location": location, "link": link})
    return jobs
