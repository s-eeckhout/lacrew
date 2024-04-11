from flask import Blueprint
from flask_restful import Api
from ..resources.hello_world import HelloWorld
from ..resources.welcome import Welcome
from ..resources.recipe import RecipeList, RecipeById, RecipeByIngredient
from ..resources.fridge_item import FridgeItem

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(HelloWorld, '/helloworld')
api.add_resource(Welcome, '/')

api.add_resource(FridgeItem, '/fridge-items', '/fridge-items/<string:name>')

##recipes
api.add_resource(RecipeList, '/recipes')
api.add_resource(RecipeById, '/recipes/<int:recipe_id>')
api.add_resource(RecipeByIngredient, '/recipes/ingredient/<string:ingredient>')