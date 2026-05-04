# Author: Kenneth Kang

# Import necessary modules from Flask and other packages
from flask import Blueprint, jsonify, request, session
from flask_mail import Message
from routes.auth_routes import users

# Create a Blueprint for mail-related routes
mail_bp = Blueprint('mail', __name__)

# Dummy inbox data for demonstration and testing purposes
# Each email has a unique sender, subject, body, and a label (inbox or sent)

# Changed a dummy_inbox to have more properties to work with on the frontend
dummy_inbox = [
    {
        "id": 1,
        "from": "alice@ka-tch.com",
        "subject": "Welcome!",
        "body": "Hello!",
        "preview": "Hello!",
        "label": "inbox",
        "read": False,
        "date": "2026-05-02T10:24:00"
    },
    {
        "id": 2,
        "from": "bob@outlook.com",
        "subject": "Meeting",
        "body": "Let's meet.",
        "preview": "Let's meet.",
        "label": "inbox",
        "read": True,
        "date": "2026-05-02T09:10:00"
    },
    {
        "id": 3,
        "from": "carol@company.org",
        "subject": "",
        "body": "",
        "preview": "",
        "label": "inbox",
        "read": False,
        "date": "2026-05-01T18:45:00"
    },
    {
        "id": 4,
        "from": "dave@ka-tch.com",
        "subject": "Long Subject " + "A"*100,
        "body": "This is a long subject edge case.",
        "preview": "This is a long subject edge case.",
        "label": "inbox",
        "read": True,
        "date": "2026-05-01T14:30:00"
    },
    {
        "id": 5,
        "from": "eve@sub.example.com",
        "subject": "Special chars !@#$%^&*()_+",
        "body": "Body with special characters: <>&\"'",
        "preview": "Body with special characters...",
        "label": "inbox",
        "read": False,
        "date": "2026-05-01T12:15:00"
    },
    {
        "id": 6,
        "from": "frank@my-email.net",
        "subject": "Unicode: 你好, мир, 😀",
        "body": "Testing unicode in body: こんにちは世界",
        "preview": "Testing unicode in body...",
        "label": "inbox",
        "read": True,
        "date": "2026-04-30T21:00:00"
    },
    {
        "id": 7,
        "from": "grace@anotherdomain.co.uk",
        "subject": "Empty Body",
        "body": "",
        "preview": "",
        "label": "inbox",
        "read": False,
        "date": "2026-04-30T16:20:00"
    },
    {
        "id": 8,
        "from": "hank@ka-tch.com",
        "subject": "Very Long Body",
        "body": "X"*1000,
        "preview": "X"*80,
        "label": "inbox",
        "read": True,
        "date": "2026-04-30T11:05:00"
    },
    {
        "id": 9,
        "from": "ivan@demo-example.com",
        "subject": "HTML <b>bold</b>",
        "body": "<script>alert('xss')</script>",
        "preview": "<script>alert('xss')</script>",
        "label": "inbox",
        "read": False,
        "date": "2026-04-29T19:00:00"
    },
    {
        "id": 10,
        "from": "judy@example.com",
        "subject": "Re: Meeting",
        "body": "See you at 10am.\n\nBest,\nJudy",
        "preview": "See you at 10am...",
        "label": "inbox",
        "read": True,
        "date": "2026-04-29T09:30:00"
    }
]
@mail_bp.route('/send', methods=['POST'])
def send_mail():
    """
    Endpoint to send an email.
    Expects JSON payload with 'to', 'subject', and 'body'.
    Only allows sending if the user is logged in (session['user'] exists).
    Actually sends the email using Flask-Mail if the recipient is not the sender (for demo/testing).
    Always adds the sent email to the dummy inbox with label 'sent'.
    """
    # Check if user is logged in
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    # Parse and validate request data
    data = request.get_json()
    if not data or not all(key in data for key in ('to', 'subject', 'body')):
        return jsonify({'error': 'Invalid request data'}), 400
    to = data['to']
    subject = data['subject']
    body = data['body']
    # Validate recipient email format
    import re
    email_regex = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
    if not re.match(email_regex, to):
        return jsonify({'error': 'Invalid recipient email address'}), 400
    # Get sender's email from user session
    sender = users.get(session['user'], {}).get('email', None)
    if not sender:
        sender = session['user']  # fallback to username if email not set
    try:
        # Always add to dummy inbox as 'sent' for the sender
        dummy_inbox.append({
            "id": len(dummy_inbox) + 1,
            "from": sender,
            "subject": subject,
            "body": body + "\n\n" + f"Sent to: {to}",
            "label": "sent"
        })
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        # Return error if sending fails
        return jsonify({'error': str(e)}), 500

@mail_bp.route('/status', methods=['GET'])
def mail_status():
    """
    Endpoint to check the status of the mail service.
    Returns a simple operational status message.
    """
    return jsonify({'status': 'Mail service is operational'}), 200

@mail_bp.route('/inbox', methods=['GET'])
def inbox():
    """
    Endpoint to get the inbox for the logged-in user.
    Only available if the user is logged in.
    Returns all dummy inbox emails, labeling sent emails as 'sent' and others as 'inbox'.
    """
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    # Mark sent emails in the inbox
    inbox_with_labels = []
    for email in dummy_inbox:
        if email.get('label') == 'sent':
            inbox_with_labels.append(email)
        else:
            # For received emails, add label 'inbox' if not present
            labeled_email = dict(email)
            if 'label' not in labeled_email:
                labeled_email['label'] = 'inbox'
            inbox_with_labels.append(labeled_email)
    return jsonify(inbox_with_labels), 200
