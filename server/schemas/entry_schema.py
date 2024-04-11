from . import ma, fields, validate, Entry

class EntrySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Entry
        load_instance = True
        ordered = True

    id = fields.Integer(required=True)

    title = fields.String(
        validate=validate.Length(min=0,max=30, error="Title must be between 2 and 30 characters")
        )
    
    body = fields.String(
        require=True, 
        validate=validate.Length(min=15,max=1250, error="Body must be between 15 and 1250 characters")
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
