from sqlalchemy_serializer import SerializerMixin
from config import db

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    # Attributes
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False, index=True)
    nickname = db.Column(db.String(40), nullable=True)

    # Relationships
    city = db.relationship('City', back_populates='favorites')
    user = db.relationship('User', back_populates='favorites')

    # Serialization rules
    serialize_rules = ('-user.password', '-user.favorites', '-city.favorites')

    def __repr__(self):
        return f"<Favorite id={self.id} nickname={self.nickname}>"
