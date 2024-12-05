from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
import re
from config import db, flask_bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True)
    email = db.Column(db.String, unique=True, index=True)
    _password_hash = db.Column("password_hash", db.String(20))
  
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
    
    @hybrid_property
    def password(self):
        raise AttributeError("passwords can only be set, not read.")

    @password.setter
    def password(self, password_to_validate):
        if not isinstance(password_to_validate, str):
            raise TypeError("password must be a string")
        if not 10 < len(password_to_validate) < 20:
            raise ValueError("password must be a string between 10 and 20 characters long")
        hashed_password = flask_bcrypt.generate_password_hash(password_to_validate).decode("utf-8")
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)