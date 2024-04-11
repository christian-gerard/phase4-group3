from . import ma, fields, validate, Category

class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        load_instance  = True
        ordered = True
        exclude=('created_at',)

    id = fields.Integer(required=True)
    name = fields.String(required=True)

    description = fields.String(
        validate=validate.Length(
            min=3,
            max=1000,
            error="Description must be between 3 and 1000 characters"
        ),
    )

    created_at = fields.DateTime()

category_schema = CategorySchema()