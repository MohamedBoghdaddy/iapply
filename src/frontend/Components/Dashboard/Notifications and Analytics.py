@app.route('/notifications', methods=['POST'])
@jwt_required()
def send_notification():
    user_email = get_jwt_identity()
    message = request.json.get('message', '')
    # Fetch user phone number from DynamoDB
    user = table.get_item(Key={'email': user_email})
    phone_number = user['Item'].get('phone_number')

    twilio_client.messages.create(
        body=message,
        from_='+1234567890',
        to=phone_number
    )
    return jsonify(message="Notification sent"), 200

@app.route('/analytics', methods=['GET'])
@jwt_required()
def get_analytics():
    user_email = get_jwt_identity()
    # Fetch user application analytics from DynamoDB
    applications = table.query(KeyConditionExpression=Key('email').eq(user_email))
    return jsonify(applications['Items']), 200
