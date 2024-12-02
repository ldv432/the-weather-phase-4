from flask_restful import Resource
from flask import session
from models.user import User

class CurrentUserFavoritesResource(Resource):
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "User not authenticated."}, 401

        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found."}, 404

        favorites = [
            favorite.to_dict(only=("id", "nickname", "city.id", "city.name"))
            for favorite in user.favorites
        ]

        return favorites, 200
