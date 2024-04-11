from flask import request, session
from flask_restful import Resource
from config import app, db, api
from schemas.user_schema import user_schema
from schemas.entry_schema import entry_schema, entries_schema
from schemas.category_schema import category_schema
from models.category import Category
from models.entry import Entry
from models.user import User

import ipdb


class Entries(Resource):
    def get(self):
        try:
            entries = entries_schema.dump(Entry.query)
            return entries, 200
        except Exception as e:
            return {"Error": str(e)}, 400
        
    def post(self):
        try:
            data = request.get_json()
            entry = entry_schema.load(data)
            db.session.add(entry)
            db.session.commit()
            return entry_schema.dump(entry), 201
        except Exception as e:
            db.session.rollback()
            return {"Error": str(e)}, 400

api.add_resource(Entries, '/entries')

class EntryById(Resource):
    def get(self,id):
        try:
            entry = entry_schema.dump(Entry.query.get(id))
            if entry:
                return entry, 200
            else:
                return {"Error": "Entry not found"}, 404
        except Exception as e:
            return {"Error": str(e)}, 400

    def patch(self,id):
        try:
            og = Entry.query.filter(Entry.id == id).first()
            if og:
                data = request.get_json()
                updated_entry = entry_schema.load(data, instance=og, partial=True)
                db.session.commit()
                return entry_schema.dump(updated_entry), 200
            else:
                return {"Error": f"Unable to find entry with id {id}"}, 404
        except Exception as e:
            return {"Error": str(e)}, 400
    
    def delete(self,id):
        try:
            entry = Entry.query.get(id)
            if entry:
                db.session.delete(entry)
                db.session.commit()
                return {}, 204
            else:
                return {"Error": "Entry not found"}, 404
        except Exception as e:
            return {"Error": str(e)}, 400
        
api.add_resource(EntryById, '/entries/<int:id>')

class SignUp(Resource):
    def post(self):
        try:
            # Pass partial on load() method to avoid id requirement
            data = request.get_json()
            # user_schema.load(data)
            new_user = User(username=data.get('username'))
            new_user.password_hash = data.get('password')
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return user_schema.dump(new_user), 201
        except Exception as e:
            return {"Error": str(e)}, 400

api.add_resource(SignUp, '/signup')

class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            user = User.query.filter_by(username=data.get('username')).first()
            if user and user.authenticate(data.get('password')):
                session["user_id"] = user.id
                session["username"] = user.username
                return user_schema.dump(user), 200
            else:
                return {"Message": "Invalid Login"}, 422
        except Exception as e:
            return {"Error": str(e)}, 400

api.add_resource(Login, '/login')



# # # # # Execute App
if __name__ == "__main__":
    app.run(port=5555, debug=True)