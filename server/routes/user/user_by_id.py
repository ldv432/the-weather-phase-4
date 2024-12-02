from flask_restful import Resource
from models.user import User
from config import db

class UserById(Resource):
    def get(self, user_id):
        try:
            user = db.session.get(User, user_id)
            if not user:
                return {"error": "User not found"}, 404
            return user.to_dict(), 200
        except Exception as e:
            return {"error": str(e)}, 500