from . import ma, fields, validate, User, validates, re

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        ordered = True
        exclude = ('_password_hash',)

        id = fields.Integer(required=True)

        username = fields.String(
            required=True, 
            validate=validate.Length(min=2, max=20)
            )
        
        _password_hash = fields.String(required=True)

user_schema = UserSchema()
