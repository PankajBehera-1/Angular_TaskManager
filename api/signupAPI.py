from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import jwt
import datetime

app = Flask(__name__)
CORS(app)

# Secret key for encoding JWT
SECRET_KEY = '8b1a9953c4611296a827abf8c47804d7Pankaj' 

# In-memory user storage
users_db = {}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    
    # Validate input
    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ['firstName', 'lastName', 'email', 'mobile', 'dateOfBirth', 'password', 'gender', 'countryID', 'skills']
    
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400
    
    email = data['email']
    if email in users_db:
        return jsonify({"error": "Email already registered"}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Create user record
    user = {
        "firstName": data['firstName'],
        "lastName": data['lastName'],
        "email": email,
        "mobile": data['mobile'],
        "dateOfBirth": data['dateOfBirth'],
        "password": hashed_password,
        "gender": data['gender'],
        "countryID": data['countryID'],
        "skills": data['skills'],
        "role": "Employee"  # Default role
    }
    
    # Save user to database
    users_db[email] = user

    # Generate JWT token
    token = jwt.encode({
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    }, SECRET_KEY, algorithm='HS256')

    return jsonify({
        "token": token,
        "user": {
            "email": email,
            "role": user["role"]
        }
    }), 201

if __name__ == '__main__':
    app.run(debug=True, port=5004)
