from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
import re

from config import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(40), nullable=False, unique=True)
    password_hash = db.Column(db.String(30), nullable=False)

    #set relationship
    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')

    #set validations
    @validates('username')
    def validate_username(self, _, value):
        if len(value) < 2:
            raise ValueError("Username must be at least 2 characters long.")
        if not value.isalnum(): #str method to check for alphanumeric characters
            raise ValueError("Username must only contain letters and numbers.")
        return value

    @validates('email')
    def validate_email(self, _, value):
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value):
            raise ValueError("Invalid email format.")
        return value