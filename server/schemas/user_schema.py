from . import ma, fields, validate, User, validates, re

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        ordered = True
        exclude = ('_password_hash',)

        username = fields.String(

            required=True, 
            validate=[
                validate.Length(
                    min=2, 
                    max=20,
                    error="Username must be between 2 and 20 characters"
                ),
                validate.Regexp(
                    r".*\.(jpeg|png|jpg)", error="File URI must be in JPEG, JPG, or PNG format"
                )
            ]
        )
        
        _password_hash = fields.String(
            required=True,
            validate=validate.Length(
                min=8,
                error='Password must be at least 8 characters long'
            )
        )

user_schema_post = UserSchema()
users_schema = UserSchema(many=True, exclude=('_password_hash',))


