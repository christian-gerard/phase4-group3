from . import ma, fields, validate, Category

class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        load_instance  = True

    name = fields.String(required=True)
    description = fields.String(
        validate=validate.Length(
            min=3,
            max=250,
            error="Description must be between 3 and 250 characters"
        ),
    )

category_schema = CategorySchema()