# cv_analysis.py
import nltk
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer

class CVAnalyzer:
    def __init__(self, cv_text):
        self.cv_text = cv_text
        self.vectorizer = TfidfVectorizer()

    def analyze_skills(self):
        words = word_tokenize(self.cv_text)
        tfidf_matrix = self.vectorizer.fit_transform([" ".join(words)])
        feature_names = self.vectorizer.get_feature_names_out()
        scores = tfidf_matrix.toarray().flatten()
        return dict(zip(feature_names, scores))
