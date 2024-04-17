from flask import request, session, g
from time import time
from flask_restful import Resource
from config import app, db, api
from werkzeug.exceptions import NotFound
from functools import wraps
from schemas.user_schema import user_schema
from schemas.entry_schema import entry_schema, entries_schema
from schemas.category_schema import category_schema
from models.category import Category
from models.entry import Entry
from models.user import User
import ipdb

# # # General Route

# # # # # Error Handling
@app.errorhandler(NotFound)
def not_found(error):
    return {"error": error.description}, 404

# # # # # Route Protection
@app.before_request
def before_request():
    path_dict = {"entrybyid": Entry, "userbyid": User }
    if request.endpoint in path_dict:
        id = request.view_args.get("id")
        record = db.session.get(path_dict.get(request.endpoint), id)
        key_name = "prod" if request.endpoint == "productionbyid" else "crew"
        setattr(g, key_name, record)

    g.time = time()

def login_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return {"message": "Access Denied, please log in!"}, 422
        return func(*args, **kwargs)
    return decorated_function

@app.after_request
def after_request(response):  #! notice the response argument automatically passsed in
    diff = time() - g.time
    print(f"Request took {diff} seconds")
    response.headers["X-Response-Time"] = str(diff)
    return response


# # # REST API

# # # # # CATEGORY
class Categories(Resource):
    def get(self):
        try:
            ## Without specifying many=True, the schema expects a single object rather than a list of objects
            serialized_categories = category_schema.dump(Category.query, many=True)
            return serialized_categories, 200
        except Exception as e:
            return {"Error": str(e)}, 400
        
api.add_resource(Categories, '/categories')


# # # # # ENTRY
class Entries(Resource):
    @login_required
    def get(self):
        try:
            entries = entries_schema.dump(Entry.query.filter_by(user_id=session.get("user_id")))
            return entries, 200
        except Exception as e:
            return {"Error": str(e)}, 400

    # @login_required
    def post(self):
        try:
            data = request.get_json()
            entry = entry_schema.load({
                "title" : data.get("title"),
                "body" : data.get("body"),
                "date" : data.get("date"),
                "category_id" : data.get("category_id"),
                "user_id" : data.get("user_id")})
            db.session.add(entry)
            db.session.commit()
            return entry_schema.dump(entry), 201
        except Exception as e:
            db.session.rollback()
            return {"Error": str(e)}, 400

api.add_resource(Entries, '/entries')

class EntryById(Resource):
    @login_required
    def get(self,id):
        try:
            entry = entry_schema.dump(Entry.query.get(id))
            if entry:
                return entry, 200
            else:
                return {"Error": "Entry not found"}, 404
        except Exception as e:
            return {"Error": str(e)}, 400
        
    @login_required
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
        
    @login_required
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


# # # # # USER LOGIN
class SignUp(Resource):
    def post(self):
        try:
            # Pass partial on load() method to avoid id requirement
            data = request.get_json()
            new_user = user_schema.load({"username": data.get('username'), "password_hash": data.get("_password_hash")})
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
            if user and user.authenticate(data.get('_password_hash')):
                session["user_id"] = user.id
                session["username"] = user.username
                return user_schema.dump(user), 200
            else:
                return {"Message": "Invalid Login"}, 422
        except Exception as e:
            return {"Error": str(e)}, 400

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        try:
            if "user_id" in session:
                del session['user_id']
                del session['username'] #! delete the entire key-value pair
                return {}, 204
            else:
                return {"Error": "A User is not logged in"}, 404

        except Exception as e:
            return {"Error": str(e)}, 400

api.add_resource(Logout, '/logout')
    
class CheckMe(Resource):
    def get():
        if "user_id" in session:
            user = db.session.get(User, session.get("user_id"))
            return user.to_dict(), 200
        else:
            return {"message": "Please log in"}, 400
        
api.add_resource(CheckMe, '/me')


# # # # # Execute App
if __name__ == "__main__":
    app.run(port=5555, debug=True)