from flask import request, session
from flask_restful import Resource
from config import app, db, api
from schemas.user_schema import user_schema
from schemas.entry_schema import entry_schema, entries_schema
from schemas.category_schema import category_schema
from models.category import Category
from models.entry import Entry
from models.user import User
import speech_recognition
import pyttsx3
import ipdb




class Entries(Resource):
    def get(self):
        try:
            if session.get("user_id"):
                entries = entries_schema.dump(Entry.query.filter_by(user_id=session.get("user_id")))
                return entries, 200
            else:
                return {"Error": "User not logged in"}, 403
        except Exception as e:
            return {"Error": str(e)}, 400
        
    def post(self):
        try:
            data = request.get_json()
            entry = entry_schema.load({
                "title" : data.get("title"),
                "body" : data.get("body"),
                "date" : data.get("date"),
                "category_id" : data.get("category_id"),
                "user_id" : session['user_id']})
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

class VoiceToText(Resource):
    def post(self):
        recognizer = speech_recognition.Recognizer()

        while True:

            try:
                with speech_recognition.Microphone() as mic:
                    recognizer.adjust_for_ambient_noise(mic, duration=0.2)
                    audio = recognizer.listen(mic)
                    text = recognizer.recognize_google(audio)
                    text = text.lower()
                    print(f"Recognized {text}")
            except speech_recognition.UnknownValueError:
                recognizer = speech_recognition.Recognizer()
                continue

api.add_resource(VoiceToText, '/voice')

# # # # # Execute App
if __name__ == "__main__":
    app.run(port=5555, debug=True)