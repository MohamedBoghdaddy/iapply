import sys
import json
import openai

openai.api_key = 'your_openai_api_key'

def generate_cover_letter(profile, job_description):
    response = openai.Completion.create(
        engine="davinci",
        prompt=f"Write a cover letter for a job with the following description: {job_description} based on the user profile: {profile}",
        max_tokens=250
    )
    return response.choices[0].text.strip()

if __name__ == "__main__":
    profile = json.loads(sys.argv[1])
    job_description = json.loads(sys.argv[2])
    cover_letter = generate_cover_letter(profile, job_description)
    print(cover_letter)
