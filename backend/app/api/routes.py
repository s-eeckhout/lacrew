from flask import Blueprint
from flask_restful import Api
from ..resources.hello_world import HelloWorld
from ..resources.welcome import Welcome
from ..resources.recipe import Recipe

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(HelloWorld, '/helloworld')
api.add_resource(Welcome, '/')
api.add_resource(Recipe, '/recipes', '/recipes/<int:id>')
