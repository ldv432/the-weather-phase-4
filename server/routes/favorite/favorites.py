from flask_restful import Resource, request
from models.favorite import Favorite
from models.city import City
from config import db
from flask import session

def fetch_city_data_from_api(city_name):
    import requests
    api_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city_name}&language=en&count=1"
    response = requests.get(api_url)
    if response.ok:
        data = response.json()
        if data['results']:
            result = data['results'][0]
            return {
                'name': result['name'],
                'latitude': result['latitude'],
                'longitude': result['longitude'],
            }
    return None

class FavoritesResource(Resource):
    def post(self):
        data = request.get_json()
        user_id = session['user_id']
        city_name = data.get('city_name')
        lat = data.get('lat')
        lon = data.get('lon')
        # import ipdb; ipdb.set_trace()
        if not city_name:
            return {"error": "City Name are required."}, 400

        # Look up city_id by city_name
        city = City.query.filter_by(name=city_name).first()
        if not city:
            city = City(name=city_name, lat=lat, long=lon)
            db.session.add(city)
            db.session.commit()

        # Check if the user and favorite already exist
        favorite = Favorite.query.filter_by(user_id=user_id, city_id=city.id).first()
        if favorite:
            return {"error": "This favorite already exists."}, 400

        # Create and save the favorite
        new_favorite = Favorite(user_id=user_id, city_id=city.id)
        try:
            db.session.add(new_favorite)
            db.session.commit()
            return new_favorite.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
