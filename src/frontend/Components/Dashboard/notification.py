from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from twilio.rest import Client

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)

twilio_client = Client('your_twilio_account_sid', 'your_twilio_auth_token')

@app.route('/notifications', methods=['POST'])
@jwt_required()
def send_notification():
    user_id = get_jwt_identity()
    message = request.json.get('message', '')
    phone_number = request.json.get('phone_number', '')

    twilio_client.messages.create(
        body=message,
        from_='+1234567890',
        to=phone_number
    )
    return jsonify(message="Notification sent"), 200

if __name__ == '__main__':
    app.run(debug=True)
