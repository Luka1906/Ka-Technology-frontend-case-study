# Author: Kenneth Kang

from flask import Blueprint, jsonify, request, session
import re

auth_bp = Blueprint('auth', __name__)

# In-memory user storage
# Structure: {username: {password, email, first_name, last_name, dob}}
users = {}

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    required_fields = (
        'username',
        'password',
        'confirm_password',
        'first_name',
        'last_name',
        'dob',
        'email'
    )

    if not data or not all(key in data for key in required_fields):
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    password = data['password']
    confirm_password = data['confirm_password']
    first_name = data['first_name']
    last_name = data['last_name']
    dob = data['dob']

    email = f"{username}@ka-tch.com"

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match.'}), 400

    if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$', password):
        return jsonify({
            'error': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol.'
        }), 400

    if username in users:
        return jsonify({'error': 'User already exists'}), 409

    users[username] = {
        'password': password,
        'email': email,
        'first_name': first_name,
        'last_name': last_name,
        'dob': dob
    }

    return jsonify({
        'message': 'Registration successful',
        'user': username,
        'email': email
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not all(key in data for key in ('username', 'password')):
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    password = data['password']

    user = users.get(username)

    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid username or password'}), 401

# Make smaller changes what is saved in session user so I can use users info on profile page
    
    session['user'] = {
        'username': username,
        'email': user['email'],
        'first_name': user['first_name'],
        'last_name': user['last_name'],
        'dob': user['dob']
    }

    return jsonify({
        'message': 'Login successful',
        'user': session['user']
    }), 200


@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)

    return jsonify({
        'message': 'Logout successful'
    }), 200


@auth_bp.route('/status', methods=['GET'])
def auth_status():
    user = session.get('user')

    if user:
        return jsonify({
            'status': 'authenticated',
            'user': user
        }), 200

    return jsonify({
        'status': 'unauthenticated'
    }), 401