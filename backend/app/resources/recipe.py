import json
from flask_restful import Resource
from flask import jsonify

from app.utils.data_helper import load_recipes


class Recipe(Resource):
    def get(self, id=None):
        name = 'recipe_' + str(id)
        #get recipes from recipes folder by id(eg. id=1 get Pasta recipe)
        #read_file = open('backend/app/recipes/recipes.json', 'r')
        #data = json.load(read_file)
        
        data = load_recipes()
        for recipe_key, recipe_value in data.items():
            if recipe_key == name:
                return jsonify(recipe_value)
        return jsonify({'message': 'Recipe not found!'})

    def post(self):
        data = {'message': 'Recipe added!'}
        return jsonify(data)
    def put(self):
        data = {'message': 'Recipe updated!'}
        return jsonify(data)
    def delete(self):
        data = {'message': 'Recipe deleted!'}
        return jsonify(data)
# Path: backend/app/resources/recipe.py
    