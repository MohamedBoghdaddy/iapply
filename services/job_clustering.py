# job_clustering.py
import requests
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer

def fetch_jobs(preferences):
    # This function should be replaced with actual logic to fetch jobs from a database or API
    jobs = [
        {"description": "Software Engineer with Python experience"},
        {"description": "Data Scientist with knowledge of ML"},
        {"description": "Full Stack Developer with JavaScript"},
        {"description": "Backend Developer with Node.js"},
        {"description": "Frontend Developer with React"},
    ]
    return jobs

def cluster_jobs(jobs, num_clusters=5):
    descriptions = [job['description'] for job in jobs]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(descriptions)
    kmeans = KMeans(n_clusters=num_clusters)
    clusters = kmeans.fit_predict(tfidf_matrix)
    return clusters
