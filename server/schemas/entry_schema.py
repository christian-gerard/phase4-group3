from . import ma, fields, validate, Entry

class EntrySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Entry
        load_instance = True
        ordered = True

    id = ma.auto_field()
    title = ma.auto_field()
    body = ma.auto_field()
    date = ma.auto_field()
    created_at = ma.auto_field()
    updated_at = ma.auto_field()

    user_id = ma.auto_field()
    category_id = ma.auto_field()



entry_schema = EntrySchema()

entries_schema = EntrySchema(many=True)
