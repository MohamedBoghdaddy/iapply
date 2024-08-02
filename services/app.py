from flask import Flask, request, jsonify
from text_extraction import extract_text
from job_application import JobApplication
from mail_service import MailService
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        cv_text = extract_text(file_path)
        return jsonify({"message": "File uploaded successfully", "filename": filename, "cv_text": cv_text})

@app.route('/api/apply-jobs', methods=['POST'])
def apply_jobs():
    data = request.json
    user_id = data.get('user_id')
    cv_text = data.get('cv')
    preferences = data.get('preferences', {})
    job_application = JobApplication(user_id, cv_text, preferences)
    results = job_application.apply_to_jobs()
    return jsonify(results)

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(port=5000, debug=True)
