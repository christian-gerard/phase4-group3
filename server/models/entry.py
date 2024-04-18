from . import SerializerMixin, validates, re, db
from datetime import datetime
from models.category import Category
from models.user import User

class Entry(db.Model, SerializerMixin):
    # # # # # Table Name
    __tablename__ = 'entries'

    # # # # # Attribute
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50))
    body = db.Column(db.String(40000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())
    date = db.Column(db.String, default=datetime.now().date().strftime("%Y-%m-%d"))
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

    # # # # # Validate
    @validates("title")
    def validate_role(self, _, title):
        if not isinstance(title, str):
            raise TypeError("Title text must be strings")
        elif len(title) > 50:
            raise ValueError(f"Title must be 50 characters or less")
        return title

    ## Body min=10, max=40000, required
    @validates("body")
    def validate_role(self, _, body):
        if not isinstance(body, str):
            raise TypeError("Entry text must be strings")
        elif len(body) < 10:
            raise ValueError(f"Entry must be at least 10 characters long")
        elif len(body) > 40000:
            raise ValueError(f"Entry may not be more than 40,000 characters")
        return body

    @validates("category_id")
    def validate_category_id(self, _, category_id):
        if not isinstance(category_id, int):
            raise TypeError("Category ids must be integers")
        elif category_id < 1:
            raise ValueError(f"{category_id} has to be a positive integer")
        elif not db.session.get(Category, category_id):
            raise ValueError(
                f"{category_id} has to correspond to an existing category"
            )
        return category_id
    
    @validates("user_id")
    def validate_user_id(self, _, user_id):
        if not isinstance(user_id, int):
            raise TypeError("User ids must be integers")
        elif user_id < 1:
            raise ValueError(f"{user_id} has to be a positive integer")
        elif not db.session.get(User, user_id):
            raise ValueError(
                f"{user_id} has to correspond to an existing user"
            )
        return user_id