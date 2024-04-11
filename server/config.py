from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from os import environ
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///dreams.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config["SQLALCHEMY_ECHO"] = True
app.secret_key = environ.get("SESSION_SECRET")
app.config["SESSION_TYPE"] = "sqlalchemy"
app.config["SESSION_SQLALCHEMY_TABLE"] = "sessions"


# # # # # App + SQLAlchemy Connection
db = SQLAlchemy(app)
app.config["SESSION_SQLALCHEMY"] = db
migrate = Migrate(app, db)

# # # # # Rest API
api = Api(app, prefix="/api/v1")

# # # # # Session
session = Session(app)

# # # # # Bcrypt
flask_bcrypt = Bcrypt(app)

# # # # # Marshmallow
ma = Marshmallow(app)

# # # # # CORS
CORS(app)
