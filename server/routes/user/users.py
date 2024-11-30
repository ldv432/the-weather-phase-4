from routes.__init__ import Resource, request, db, make_response, session
from models.user import User
import re

class Users(Resource):
    def get(self):
        try:
            users_count = Users.query.count()
            return users_count, 200
        except Exception as e:
            return {"error": str(e)}, 400
        
    def post(self):

        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        #user validations
        if not username or not email or not password:
            return {"error": "Username, email and password are required."}
        if len(username) < 2:
            return {"error": "Username must be at least two characters long."}
        if not username.isalnum():
            return {"error": "Username can only contain numbers and letters."}
        if User.query.filter_by(username=username):
            return {"error": "Username already in use."}
        if User.query.filter_by(email=email):
            return {"error": "Email already in use."}
        
        #email/password validation
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, email):
            return {"error": "Invalid email format."}, 400
        if len(password) < 8 or not any(char.isupper() for char in password) or not any(char in "!@#$%^&*()_+" for char in password):
            return {"error": "Password must be at least 8 characters long, include one uppercase letter, and one special character."}, 400
        
        #user creation
        try:
            new_user = User(username=username, email=email)
            new_user.set_password(password)

            db.session.add(new_user)
            db.session.commit()

            return make_response(new_user.serialize(), 201)
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

        



