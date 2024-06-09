from flask import Blueprint, render_template
from flask_login import login_required, logout_user, current_user
from .models import User

views = Blueprint("views", __name__)

@views.route("/")
def index():
    logout_user()
    return render_template("index.html", user=current_user)


@views.route("/home")
@login_required
def home():
    return render_template("homepage.html", user=current_user)


@views.route("/tv")
@login_required
def tv():
    return render_template("tv.html", user=current_user)