from flask_restful import Resource, request
from models.favorite import Favorite
from config import db

class FavoriteByIdResource(Resource):
    def delete(self, favorite_id):
        favorite = Favorite.query.get(favorite_id)
        if not favorite:
            return {"error": "Favorite not found."}, 404
        try:
            db.session.delete(favorite)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
        
    def patch(self, favorite_id):
        favorite = Favorite.query.get(favorite_id)
        if not favorite:
            return {"error": "Favorite not found."}, 404

        data = request.get_json()
        nickname = data.get('nickname')

        if nickname:
            favorite.nickname = nickname

        try:
            db.session.commit()
            return favorite.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
