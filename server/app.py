from flask_restful import Resource
from config import app, db, api


class Entries(Resource):
    pass

api.add_resource(Entries, '/entries')