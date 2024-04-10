from . import ma, fields, validate, Entry

class EntrySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Entry
        load_instance = True
        ordered = True

    
    title = fields.String()
    body = fields.String()
    date = fields.DateTime()

    user_id = fields.Integer(required=True)
    category_id = fields.Integer(required=True)



entry_schema = EntrySchema()
