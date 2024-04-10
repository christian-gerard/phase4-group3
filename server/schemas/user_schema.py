from . import ma, fields, validate, User

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

        username = fields.String(required=True, validate=validate.Length(min=2, max=20))



user_schema = UserSchema()
