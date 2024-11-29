from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class Favorite(db.Model):
    __tablename__ = 'favorites'

    #setting attributes
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False, index=True)
    nickname = db.Column(db.String(40), nullable=True)

    #setting relationships
    user = db.relationship('User', back_populates='favorites')
    city = db.relationship('City', back_populates='favorites')

    def __repr__(self):
        return f"<Favorite id={self.id} nickname={self.nickname}>"
