from flask_restful import Resource
from config import app, db, api

from models.category import Category
from models.entry import Entry
from models.user import User


class Entries(Resource):
    pass

api.add_resource(Entries, '/entries')







# # # # # Execute App
if __name__ == "__main__":
    app.run(port=5555, debug=True)