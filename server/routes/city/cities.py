from flask_restful import Resource
from models.city import City

class CitiesResource(Resource):
    def get(self):
        try:
            return [city.name for city in City.query], 200
        except Exception as e:
            return {"error": str(e)}, 400