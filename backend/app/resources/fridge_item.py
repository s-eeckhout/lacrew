from flask_restful import Resource, reqparse, abort
from app.utils.data_helper import load_data, save_data
from app.utils.get_image_url import get_random_image_url
from flask import jsonify

'''
How to use:

get with CURL:
http://127.0.0.1:5001/fridge-items

post with CURL: 
curl -X POST -H "Content-Type: application/json" -d '{"name":"Minced Meat","day_added":"2024-03-18","expiration_time":5,"quantity":3,"category":"Meat"}' http://localhost:5001/fridge-items

update with CURL:
curl -X PATCH -H "Content-Type: application/json" -d '{"percentage_left": 75}' http://localhost:5001/fridge-items/Butter

delete with CURL:
curl -X DELETE http://localhost:5001/fridge-item/Minced%20Meat
'''

parser = reqparse.RequestParser()
parser.add_argument('name', required=True)
parser.add_argument('day_added', required=True)
parser.add_argument('expiration_time', required=True, type=int)
parser.add_argument('quantity', required=True, type=int)
parser.add_argument('category', required=True)
patch_parser = reqparse.RequestParser()
patch_parser.add_argument('percentage_left', required=True, type=int, help="Percentage of item left")

class FridgeItem(Resource):
    def get(self, name=None):  # Add 'name' as an optional parameter
        items = load_data()
        if name:  # If a name is provided in the URL, find and return that specific item
            item = next((item for item in items if item['name'] == name), None)
            if item:
                return jsonify(item)
            else:
                # If the item with the given name is not found, return a 404 error
                return {'message': f'Item with name {name} not found'}, 404
        # If no name is provided, return all items
        return jsonify(items)

    def post(self):
        data = parser.parse_args()
        items = load_data()
        new_id = max(item['id'] for item in items) + 1 if items else 1
        image_url = get_random_image_url(data['name'])
        item = {
            'id': new_id,
            'name': data['name'],
            'day_added': data['day_added'],
            'expiration_time': data['expiration_time'],
            'quantity': data['quantity'],
            'category': data['category'],
            'link': image_url,  # Use the randomly selected image URL
            'percentage_left': 100  # Start with 100% for new items

        }
        items.append(item)
        save_data(items)
        return item, 201
    
    def patch(self, name):  # 'name' is obtained from the URL
        args = patch_parser.parse_args()  # Use the patch_parser for PATCH requests
        items = load_data()
        item = next((item for item in items if item['name'] == name), None)
        
        if item:
            item['percentage_left'] = args['percentage_left']  # Update the percentage_left field
            save_data(items)
            return item, 200  # Return the updated item
        
        # If the item with the given name is not found, return a 404 error
        return {'message': f'Item with name {name} not found'}, 404
    
    def delete(self, name):
        items = load_data()
        item = next((item for item in items if item['name'] == name), None)
        if item:
            items.remove(item)
            save_data(items)
            return '', 204
        else:
            return {'message': f'Item with name {name} not found'}, 404
