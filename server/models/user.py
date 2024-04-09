from . import SerializerMixin, validates, re, db
from sqlalchemy.ext.hybrid import hybrid_property
from config import flask_bcrypt
from datetime import datetime


class User(db.Model, SerializerMixin):
    # # # # # Table Name
    __tablename__ = 'users'

    # # # # # Attribute
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())

    # # # # # Relationship
    entries = db.relationship('Entry', back_populates='user')

    # # # # # Serialize
    serialize_rules=('-entries', '-password_hash')

    # # # # # Representation
    def __repr__(self):
        return f""" 
            <User {self.id}
                username: {self.username}
                created_at: {self.created_at}
                />
        """

    # # # # # Property

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Access to password is restricted')
    
    @password_hash.setter
    def password_hash(self, new_password):
        hashed_password = flask_bcrypt.generate_password_hash(new_password).decode('utf-8')
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)
    
    # # # # # Validate