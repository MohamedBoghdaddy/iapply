# job_application.py
import requests

class JobApplication:
    def __init__(self, user_id, cv_text, preferences):
        self.user_id = user_id
        self.cv_text = cv_text
        self.preferences = preferences

    def apply_to_jobs(self):
        cv_analyzer = CVAnalyzer(self.cv_text)
        skills = cv_analyzer.analyze_skills()
        jobs = fetch_jobs(self.preferences)
        clusters = cluster_jobs(jobs)
        response = self.apply_to_jobs_api(clusters)
        return response

    def apply_to_jobs_api(self, clustered_jobs):
        try:
            response = requests.post(
                "https://anthropics-api.com/apply",
                json={"userId": self.user_id, "jobs": clustered_jobs},
                headers={"Authorization": f"Bearer {os.getenv('ANTHROPICS_API_KEY')}", "Content-Type": "application/json"},
            )
            return response.json()
        except Exception as e:
            raise Exception(f"Error applying to jobs via API: {e}")
