from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

class City(db.Model):
    __tablename__ = 'cities'

    #setting attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    lat = db.Column(db.Float, nullable=False)
    long = db.Column(db.Float, nullable=False)

    #setting relationships
    favorites = db.relationship('Favorite', back_populates='city', cascade='all, delete-orphan')
    current_wxs = db.relationship('CurrentWx', back_populates='city', cascade='all, delete-orphan')
    forecasts = db.relationship('Forecast', back_populates='city', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<City {self.name}>"