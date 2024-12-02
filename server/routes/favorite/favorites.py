from flask_restful import Resource, request
from models.favorite import Favorite
from config import db

class FavoritesResource(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        city_id = data.get('city_id')
        nickname = data.get('nickname')
        
        if not user_id or not city_id:
            return {"error": "User ID and City ID are required."}, 400
        
        try:
            favorite = Favorite(user_id=user_id, city_id=city_id, nickname=nickname)
            db.session.add(favorite)
            db.session.commit()
            return favorite.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
