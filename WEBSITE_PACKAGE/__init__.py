from flask import Flask as fl, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_manager

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = fl(__name__)
    app.config['SECRET_KEY'] = "mackpounds"
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)

    from .auth import auth
    from .views import views


    app.register_blueprint(auth, url_prefix="/")
    app.register_blueprint(views, url_prefix="/")

    from .models import User

    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = "views.home"
    # login_manager.login_message = flash("New User Logged In", category='success')
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app