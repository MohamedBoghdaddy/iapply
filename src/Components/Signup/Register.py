from flask import Flask, request, jsonify
import boto3
import openai
import uuid
from datetime import datetime
from werkzeug.security import generate_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)

dynamodb = boto3.resource('dynamodb')
openai.api_key = 'your_openai_api_key'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    user_profile = {
        'name': data['name'],
        'email': data['email'],
        'experience': data['experience'],
        'skills': data['skills'],
        'education': data['education']
    }
    table = dynamodb.Table('Users')
    table.put_item(Item={
        'user_id': str(uuid.uuid4()),
        'email': data['email'],
        'password_hash': hashed_password,
        'profile_data': user_profile,
        'job_limit': 4000,
        'subscription_status': 'active',
        'created_at': datetime.now().isoformat(),
        'updated_at': datetime.now().isoformat()
    })
    return jsonify(message="User registered successfully"), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    table = dynamodb.Table('Users')
    user = table.get_item(Key={'email': data['email']})
    if user and check_password_hash(user['Item']['password_hash'], data['password']):
        token = create_access_token(identity=data['email'])
        return jsonify(token=token), 200
    return jsonify(message="Invalid credentials"), 401

@app.route('/apply', methods=['POST'])
@jwt_required()
def apply():
    data = request.get_json()
    user_profile = data['profile']
    job_description = data['job_description']
    response = openai.Completion.create(
        engine="davinci",
        prompt=f"Write a cover letter for a job with the following description: {job_description} based on the user profile: {user_profile}",
        max_tokens=250
    )
    cover_letter = response.choices[0].text
    submit_application(data['job_link'], user_profile, cover_letter)
    return jsonify(message="Application submitted"), 200

def submit_application(job_link, user_profile, cover_letter):
    # Implement job application submission logic
    pass

if __name__ == '__main__':
    app.run(debug=True)
