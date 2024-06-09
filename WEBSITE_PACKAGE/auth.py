from flask import Blueprint, render_template,request,flash, redirect, url_for
from flask_login import login_required, login_user, logout_user, current_user
from .models import User
from . import db
from werkzeug.security import check_password_hash, generate_password_hash

auth = Blueprint("auth", __name__ )

@auth.route("login", methods=['GET', 'POST'])
def login():
    logout_user()
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash("login Successfully!", category='success')
                login_user(user, remember=True)
                return redirect(url_for("views.home"))
            else:
                flash('Password is incorrect!', category='error')
                return redirect(url_for("auth.login"))
        else:
            flash('Username doesn\'t exists!', category='error')
        

    return render_template("login.html", user=current_user)

@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("auth.login"))

@auth.route("signup", methods=['GET','POST'])
def signup():
    logout_user()
    if request.method == 'POST':
        fname = request.form.get("fname")
        number = request.form.get('number')
        email = request.form.get("email1")
        password = request.form.get("password1")
        cpassword = request.form.get("c-password")
        checkbox = request.form.get('checkbox')

        user = User.query.filter_by(email=email).first()
        if user:
            flash("Email already Exists!", category='error')
        elif len(fname) < 3:
            flash('Enter your Full Name!', category='error')
            print(fname)
        elif len(number) < 4:
            flash('Phone Number is too short!', category='error')
        elif len(email) < 3:
            flash('email is not proper', category='error')
        elif len(password) < 6:
            flash('Password need to be strong', category='error')
        elif password != cpassword:
            flash('Your password don\'t match', category='error')
        # elif checkbox != True:
        #     flash('Accept the Terms and conditions!', category='error')
        else:
            new_user = User(fname=fname, phone=number, email=email, password=generate_password_hash(password, method='pbkdf2:sha256'))
            db.session.add(new_user)
            db.session.commit()
            flash('Account successfully created!', category='success')
            return redirect(url_for("auth.login"))
            
    return render_template("signup.html",user=current_user)


