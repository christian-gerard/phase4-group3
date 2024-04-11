from . import ma, fields, validate, Entry

class EntrySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Entry
        load_instance = True
        ordered = True

    id = fields.Integer(required=True)

    title = fields.String(
        validate=validate.Length(
            max=50, 
            error="Title must be less than 50 characters")
        )
    
    body = fields.String(
        require=True, 
        validate=validate.Length(
            min=10,
            max=40000, 
            error="Body must be between 15 and 40,000 characters")
        )
    
    date = fields.Date(require=True)
    created_at = fields.DateTime()
    updated_at = fields.DateTime()

    user_id = fields.Integer()
    user = fields.Nested('UserSchema', exclude=('created_at',))

    category_id = fields.Integer()
    category = fields.Nested('CategorySchema', exclude=('created_at',))



entry_schema = EntrySchema()

entries_schema = EntrySchema(many=True)
