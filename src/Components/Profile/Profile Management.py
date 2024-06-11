from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)

# User Registration with hashed passwords
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    # Save user data to DynamoDB
    table = dynamodb.Table('Users')
    table.put_item(Item={'email': data['email'], 'password': hashed_password, 'profile': data['profile']})
    return jsonify(message="User registered successfully"), 201

# User Login with JWT
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = table.get_item(Key={'email': data['email']})
    if user and check_password_hash(user['Item']['password'], data['password']):
        token = create_access_token(identity=data['email'])
        return jsonify(token=token), 200
    return jsonify(message="Invalid credentials"), 401

if __name__ == '__main__':
    app.run(debug=True)
