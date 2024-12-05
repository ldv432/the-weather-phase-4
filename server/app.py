from flask import request
from flask_restful import Resource
from config import app, db, api

from routes.city.cities import CitiesResource
from routes.auth.signup import Signup
from routes.auth.login import Login
from routes.auth.current_user import CurrentUser
from routes.auth.logout import Logout
app.secret_key="the_secret_key"

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

api.add_resource(CitiesResource, '/cities')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CurrentUser, '/current-user')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

