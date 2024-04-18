import json
from flask_restful import Resource
from flask import jsonify
from app.utils.data_helper import load_recipes

path = 'backend/app/recipes/recipes.json'
class RecipeList(Resource):
    def get(self):
        data = load_recipes()
        return data

class RecipeById(Resource):
    def get(self, recipe_id):
        data = load_recipes()    
        recipe_key = f"recipe_{recipe_id}"
        recipe = data.get(recipe_key)
        if recipe:
            return recipe
        return {'message': 'Recipe not found!'}, 404

class RecipeByIngredient(Resource):
    def get(self, ingredient):
        data = load_recipes()
        matching_recipes = {}
        for recipe_id, recipe in data.items():
            if ingredient.lower() in [ing.lower() for ing in recipe.get('ingredients', [])]:
                matching_recipes[f"{recipe_id}"] = recipe
        if matching_recipes:
            return jsonify(matching_recipes)
        return {'message': f'No recipes found containing the ingredient {ingredient}.'}, 404

# Path: backend/app/resources/recipe.py
    