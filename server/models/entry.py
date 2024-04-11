from . import SerializerMixin, validates, re, db
from datetime import datetime


class Entry(db.Model, SerializerMixin):
    # # # # # Table Name
    __tablename__ = 'entries'

    # # # # # Attribute
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    body = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())
    date = db.Column(db.Date, default=datetime.now().date())
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # # # # # Relationship
    category = db.relationship('Category', back_populates='entries')
    user = db.relationship('User', back_populates='entries')

    # # # # # Serialize
    serialize_rules=('-category', '-user')

    # # # # # Representation
    def __repr__(self):
        return f""" 
            <Entry {self.id}
                title: {self.title}
                body: {self.body[0:10]} ...
                date: {self.date}
                category_id: {self.category_id}
                user_id: {self.user_id}
                />
        """

    # # # # # Property
    
    # # # # # Validate