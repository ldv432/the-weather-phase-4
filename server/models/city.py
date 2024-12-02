from sqlalchemy_serializer import SerializerMixin
from config import db

class City(db.Model, SerializerMixin):
    __tablename__ = 'cities'

    # Serialization rules
    serialize_rules = ('-favorites.city', '-favorites')

    # Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    lat = db.Column(db.Float, nullable=False)
    long = db.Column(db.Float, nullable=False)

    # Relationships
    favorites = db.relationship('Favorite', back_populates='city', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<City {self.name}>"
