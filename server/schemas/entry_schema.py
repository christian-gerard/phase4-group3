from . import ma, fields, validate, validates, Entry, datetime

class EntrySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Entry
        load_instance = True
        ordered = True
        partial = ('id',)

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
            error="Body must be between 10 and 40,000 characters")
        )

    date = fields.String(require=True)
    created_at = fields.DateTime()
    updated_at = fields.DateTime()

    user_id = fields.Integer(required=True)
    user = fields.Nested('UserSchema', exclude=('created_at',))

    category_id = fields.Integer(required=True)
    category = fields.Nested('CategorySchema', exclude=('created_at',))

    @validates('date')
    def validate_date(self, date):
        if not datetime.strptime(date, "%Y-%m-%d"):
            raise ValueError('Date must be in \"YYYY-MM-DD\"')

entry_schema = EntrySchema()
entries_schema = EntrySchema(many=True)
