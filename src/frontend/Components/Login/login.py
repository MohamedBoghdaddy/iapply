from flask_jwt_extended import JWTManager, create_access_token, jwt_required

app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    table = dynamodb.Table('Users')
    user = table.get_item(Key={'email': data['email']})
    if user and check_password_hash(user['Item']['password_hash'], data['password']):
        token = create_access_token(identity=data['email'])
        return jsonify(token=token), 200
    return jsonify(message="Invalid credentials"), 401
