from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import jwt
import datetime
import logging

app = Flask(__name__)

# Initialize CORS
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Secret key for encoding JWT
SECRET_KEY = '8b1a9953c4611296a827abf8c47804d7Pankaj'

# Example user data with hashed passwords and additional user details
users_db = {
    'admin': {
        'password': bcrypt.hashpw('admin@123'.encode('utf-8'), bcrypt.gensalt()),
        'email': 'admin@example.com',
        'role': 'admin'
    },
    'pankaj': {
        'password': bcrypt.hashpw('pankaj@123'.encode('utf-8'), bcrypt.gensalt()),
        'email': 'pankaj@example.com',
        'role': 'Employee'
    },
    'deba': {
        'password': bcrypt.hashpw('deba@123'.encode('utf-8'), bcrypt.gensalt()),
        'email': 'deba@example.com',
        'role': 'Employee'
    },
    'khusi': {
        'password': bcrypt.hashpw('khusi@123'.encode('utf-8'), bcrypt.gensalt()),
        'email': 'khusi@example.com',
        'role': 'Employee'
    },
    
}

@app.route('/login', methods=['POST'])
def login():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        logging.debug(f"Received data: {data}")

        # Validate the input
        if not data or 'UserName' not in data or 'Password' not in data:
            return jsonify({'error': 'Invalid input: Missing username or password'}), 400

        username = data['UserName']
        password = data['Password'].encode('utf-8')

        # Check if the username exists
        if username in users_db:
            user_info = users_db[username]
            hashed_password = user_info['password']

            if bcrypt.checkpw(password, hashed_password):
                # Generate JWT token
                token = jwt.encode({
                    'username': username,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
                }, SECRET_KEY, algorithm='HS256')

                # Return user details along with token
                return jsonify({
                    'token': token,
                    'user': {
                        'email': user_info['email'],
                        'role': user_info['role']
                    }
                }), 200
            else:
                return jsonify({'error': 'Invalid username or password'}), 401
        else:
            return jsonify({'error': 'Invalid username or password'}), 401

    except Exception as e:
        logging.error(f"Error processing request: {e}")
        return jsonify({'error': 'An error occurred, please try again later'}), 500

@app.route('/users', methods=['GET'])
def get_users():
    try:
        # Get all usernames from the users_db
        usernames = list(users_db.keys())
        
        # Return the list of usernames
        return jsonify({'usernames': usernames}), 200
    except Exception as e:
        logging.error(f"Error fetching usernames: {e}")
        return jsonify({'error': 'An error occurred, please try again later'}), 500

if __name__ == '__main__':
    app.run(debug=True)
