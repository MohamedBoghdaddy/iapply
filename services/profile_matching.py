# profile_matching.py
import spacy

nlp = spacy.load('en_core_web_sm')

def match_profile_to_job(profile, job_description):
    profile_doc = nlp(profile)
    job_doc = nlp(job_description)
    
    similarity = profile_doc.similarity(job_doc)
    return similarity
