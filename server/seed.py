#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from faker import Faker
from config import db, app
from models.city import City

def seed_cities():
    """Seed the database with city data."""
    cities_data = [
        {"name": "New York", "lat": 40.7128, "long": -74.0060},
        {"name": "Los Angeles", "lat": 34.0522, "long": -118.2437},
        {"name": "Chicago", "lat": 41.8781, "long": -87.6298},
        {"name": "Houston", "lat": 29.7604, "long": -95.3698},
        {"name": "Phoenix", "lat": 33.4484, "long": -112.0740},
        {"name": "Philadelphia", "lat": 39.9526, "long": -75.1652},
        {"name": "San Antonio", "lat": 29.4241, "long": -98.4936},
        {"name": "San Diego", "lat": 32.7157, "long": -117.1611},
        {"name": "Dallas", "lat": 32.7767, "long": -96.7970},
        {"name": "San Jose", "lat": 37.3382, "long": -121.8863},
        {"name": "Austin", "lat": 30.2672, "long": -97.7431},
        {"name": "Jacksonville", "lat": 30.3322, "long": -81.6557},
        {"name": "Fort Worth", "lat": 32.7555, "long": -97.3308},
        {"name": "Columbus", "lat": 39.9612, "long": -82.9988},
        {"name": "Charlotte", "lat": 35.2271, "long": -80.8431},
        {"name": "San Francisco", "lat": 37.7749, "long": -122.4194},
        {"name": "Indianapolis", "lat": 39.7684, "long": -86.1581},
        {"name": "Seattle", "lat": 47.6062, "long": -122.3321},
        {"name": "Denver", "lat": 39.7392, "long": -104.9903},
        {"name": "Washington", "lat": 38.9072, "long": -77.0369},
        {"name": "Boston", "lat": 42.3601, "long": -71.0589},
        {"name": "El Paso", "lat": 31.7619, "long": -106.4850},
        {"name": "Nashville", "lat": 36.1627, "long": -86.7816},
        {"name": "Detroit", "lat": 42.3314, "long": -83.0458},
        {"name": "Oklahoma City", "lat": 35.4676, "long": -97.5164},
        {"name": "Portland", "lat": 45.5051, "long": -122.6750},
        {"name": "Las Vegas", "lat": 36.1699, "long": -115.1398},
        {"name": "Memphis", "lat": 35.1495, "long": -90.0490},
        {"name": "Louisville", "lat": 38.2527, "long": -85.7585},
        {"name": "Baltimore", "lat": 39.2904, "long": -76.6122},
        {"name": "Milwaukee", "lat": 43.0389, "long": -87.9065},
        {"name": "Albuquerque", "lat": 35.0844, "long": -106.6504},
        {"name": "Tucson", "lat": 32.2226, "long": -110.9747},
        {"name": "Fresno", "lat": 36.7378, "long": -119.7871},
        {"name": "Mesa", "lat": 33.4152, "long": -111.8315},
        {"name": "Sacramento", "lat": 38.5816, "long": -121.4944},
        {"name": "Atlanta", "lat": 33.7490, "long": -84.3880},
        {"name": "Kansas City", "lat": 39.0997, "long": -94.5786},
        {"name": "Colorado Springs", "lat": 38.8339, "long": -104.8214},
        {"name": "Miami", "lat": 25.7617, "long": -80.1918},
        {"name": "Raleigh", "lat": 35.7796, "long": -78.6382},
        {"name": "Omaha", "lat": 41.2565, "long": -95.9345},
        {"name": "Long Beach", "lat": 33.7701, "long": -118.1937},
        {"name": "Virginia Beach", "lat": 36.8529, "long": -75.9780},
        {"name": "Oakland", "lat": 37.8044, "long": -122.2712},
        {"name": "Minneapolis", "lat": 44.9778, "long": -93.2650},
        {"name": "Tulsa", "lat": 36.1539, "long": -95.9928},
        {"name": "Arlington", "lat": 32.7357, "long": -97.1081},
        {"name": "New Orleans", "lat": 29.9511, "long": -90.0715},
        {"name": "Wichita", "lat": 37.6872, "long": -97.3301},
    ]

    try:
        for city_data in cities_data:
            city = City(
                name=city_data["name"],
                lat=city_data["lat"],
                long=city_data["long"]
            )
            db.session.add(city)

        db.session.commit()
        print("50 cities have been seeded successfully!")
    except Exception as e:
        db.session.rollback()
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    with app.app_context():
        seed_cities()