import logging

# Configure logging
logging.basicConfig(level=logging.ERROR, filename='error.log')

@app.errorhandler(Exception)
def handle_exception(e):
    logging.error(f"Error: {e}")
    return jsonify(message="An internal error occurred"), 500

if __name__ == '__main__':
    app.run(debug=False)
