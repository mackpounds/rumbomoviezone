from flask_login import UserMixin
from . import db



class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(200), unique=True)
    phone = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(150), nullable=False)
