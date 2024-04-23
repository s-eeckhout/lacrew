import json
from flask_restful import Resource, reqparse
from flask import jsonify
# from app.utils.data_helper import load_data, save_data
from app.utils.data_helper import load_recipes, save_recipes

patch_parser = reqparse.RequestParser()
patch_parser.add_argument('saved', required=True, type=bool)

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
    
    def patch(self, recipe_id):  # 'name' is obtained from the URL
        print("access patch2")
        args = patch_parser.parse_args()  # Use the patch_parser for PATCH requests
        items = load_recipes()

        for recipe_key, recipe_details in items.items():
            if recipe_details["recipe_id"] == recipe_id: 
                item = recipe_details
        
        if item:
            item['saved'] = args['saved']  # Update the percentage_left field
            save_recipes(items)
            return item, 200  # Return the updated item
        
        # If the item with the given name is not found, return a 404 error
        return {'message': f'Item with name {recipe_id} not found'}, 404

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
    