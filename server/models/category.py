from . import SerializerMixin, validates, re, db
from datetime import datetime

class Category(db.Model, SerializerMixin):
    # # # # # Table Name
    __tablename__ = 'categories'

    # # # # # Attribute
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    summary = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())

    # # # # # Relationship
    entries = db.relationship('Entry',back_populates='category')

    # # # # # Serialize
    serialize_rules=('-entries',)

    # # # # # Representation
    def __repr__(self):
        return f""" 
            <Category {self.id}
                name: {self.name}
                summary: {self.summary}
                description: {self.description[0:10]} ...
                created_at: {self.created_at}
                />
        """
