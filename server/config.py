from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_session import Session
from flask_bcrypt import Bcrypt
from os import environ

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///dreams.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config["SQLALCHEMY_ECHO"] = True
app.secret_key = environ.get("SESSION_SECRET")
app.config["SESSION_TYPE"] = "sqlalchemy"
app.config["SESSION_SQLALCHEMY_TABLE"] = "sessions"

# flask-sqlalchemy connection to app
db = SQLAlchemy(app)
app.config["SESSION_SQLALCHEMY"] = db
# flask-migrate connection to app
migrate = Migrate(app, db)
# flask-restful connection to app
api = Api(app, prefix="/api/v1")
# flask-session
session = Session(app)
# session.app.session_interface.db.create_all()
flask_bcrypt = Bcrypt(app)