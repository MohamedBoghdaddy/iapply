@app.route('/admin/users', methods=['GET'])
@jwt_required()
def list_users():
    # Ensure the user is an admin
    user_email = get_jwt_identity()
    user = table.get_item(Key={'email': user_email})
    if user['Item']['role'] != 'admin':
        return jsonify(message="Access forbidden"), 403

    # List all users
    users = table.scan()
    return jsonify(users['Items']), 200

@app.route('/admin/jobs', methods=['GET'])
@jwt_required()
def list_jobs():
    # Ensure the user is an admin
    user_email = get_jwt_identity()
    user = table.get_item(Key={'email': user_email})
    if user['Item']['role'] != 'admin':
        return jsonify(message="Access forbidden"), 403

    # List all job listings
    jobs = job_table.scan()
    return jsonify(jobs['Items']), 200
