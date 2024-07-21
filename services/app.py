from flask import Flask, request, jsonify
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/upload', methods=['POST'])
def upload():
    data = request.json
    file_path = data.get('file_path')
    app.logger.debug(f'Received file path: {file_path}')
    if not file_path:
        return jsonify({"error": "No file path provided"}), 400

    # Simulate extracting text
    extracted_text = "Sample extracted text"  # Placeholder for actual AI extraction logic
    app.logger.debug(f'Extracted text: {extracted_text}')
    # Remove the identity check as it is always False
    # if extracted_text is None:
    #    return jsonify({"error": "Failed to extract text"}), 500

    return jsonify({"message": "Text extracted successfully", "text": extracted_text})

@app.route('/app', methods=['GET'])
def get_data():
    app.logger.info('Received request for /data')
    data = {
        'message': 'Hello from Python!'
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
