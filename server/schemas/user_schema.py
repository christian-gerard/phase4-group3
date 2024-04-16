# from . import ma, fields, validate, User, validates, re

# class UserSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = User
#         load_instance = True
#         ordered = True
#         exclude = ('_password_hash',)

#         username = fields.String(

#             required=True, 
#             validate=[
#                 validate.Length(
#                     min=2, 
#                     max=20,
#                     error="Username must be between 2 and 20 characters"
#                 ),
#                 validate.Regexp(
#                     r".*\.(jpeg|png|jpg)", error="File URI must be in JPEG, JPG, or PNG format"
#                 )
#             ]
#         )
        
#         _password_hash = fields.String(
#             required=True,
#             validate=validate.Length(
#                 min=8,
#                 error='Password must be at least 8 characters long'
#             )
#         )

# user_schema_post = UserSchema()
# users_schema = UserSchema(many=True, exclude=('_password_hash',))

from . import ma, fields, validate, User, validates, re

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        ordered = True
        exclude = ('_password_hash',)

    username = fields.String(

        required=True, 
        unique=True,
        validate=[
            validate.Length(
                min=2, 
                max=20,
                error="Username must be between 2 and 20 characters"
            )
        ]
    )

    password_hash = fields.String(
        data_key="password_hash",
        required=True,
        validate=validate.Length(
            min=8, error="Password must be at least 8 characters long"
        ),
        load_only=True
    )

    entries = fields.Nested(
        "EntrySchema",
        only=('title', 'body', 'date', 'id'),
        exclude=('user',),
        many=True
    )

    def load(self, data, instance=None, *, partial=False, **kwargs):
        # Load the instance using Marshmallow's default behavior
        loaded_instance = super().load(
            data, instance=instance, partial=partial, **kwargs
        )

        # Set attributes manually, triggering property setters
        for key, value in data.items():
            setattr(loaded_instance, key, value)

        return loaded_instance


user_schema = UserSchema()
users_schema = UserSchema(many=True)
