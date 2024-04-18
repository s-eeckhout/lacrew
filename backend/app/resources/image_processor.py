from flask_restful import Resource, reqparse
from werkzeug.datastructures import FileStorage
from PIL import Image
import pytesseract
#import IPython.display
from PIL import Image
import json
from transformers import AutoModelForQuestionAnswering, AutoTokenizer
from transformers import pipeline
import pandas as pd
import torch
import requests
import datetime


parser = reqparse.RequestParser()
parser.add_argument('image', type=FileStorage, location='files', required=True, help="Image is required")
"""
post with CURL: 
curl -X POST -F "image=@/Users/mischatomaszrauch/University/MSc/AcademicYear_01/03_Period/BusinessDevelopmentLab/lacrew/backend/IMG_8517.png" http://127.0.0.1:5001/process-image
"""
class ImageProcessor(Resource):
    def post(self):
        args = parser.parse_args()
        image_file = args['image']
        if image_file:
            # Process the image
            result = self.extract_items(image_file)
            #api="http://192.168.0.101:5001/fridge-items"
            api="https://backend-lacrew-761adfcfe00d.herokuapp.com/fridge-items"
            self.post_items_to_api(result,api)
            return {'message': 'Image processed successfully', 'data': result}, 200
        else:
            return {'message': 'No image provided'}, 400
        
    def extract_items(self,image):
        receiptOcrEndpoint = 'https://ocr.asprise.com/api/v1/receipt'
        # Prepare the file dictionary correctly using FileStorage.stream
        files = {"file": (image.filename, image.stream, image.content_type)}
        r = requests.post(receiptOcrEndpoint, data={
            'client_id': 'TEST',
            'recognizer': 'auto',
            'ref_no': 'ocr_python_123',
        }, files=files)
        response_data = json.loads(r.text)

        # Extracting item descriptions
        item_names = [item['description'] for receipt in response_data['receipts'] for item in receipt['items']]

        print("extracted item_names ", item_names)    

        classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
        items = pd.DataFrame({'name': item_names, 'category': None, 'expiration': None})
        # all numbers are in days
        food_categories = {
            'Milk': 7,
            'Yoghurt': 14,
            'Cheese': 30,
            'Butter': 60,
            'Eggs': 30,
            'Vegetables': 5,
            'Fruit': 5,
            'Onion/Garlic': 30,
            'Potatoes': 21,
            'Meat': 7,
            'Fish': 3,
            'Frozen': 180,
            'Bread': 7,
            'Beverages': 180,
            'Juice': 14,
            'Snacks': 180, 
            'Canned': 365,
            'Pasta': 730,
            'Rice': 730,
            'Condiments/Spices': 365,
            'Non-Food': None,  # Non-food items will not have expiration dates
            'Other': None
        }

        items = self.classify(items, food_categories,classifier)
        print("start type ",type(items))
        items = items.to_dict(orient='records')
        print("end type ",type(items))
        return items
    
    def classify(self,items, food_categories, classifier):
        labels = list(food_categories.keys())
        for index, row in items.iterrows():
            sequence_to_classify = row['name']
            result = classifier(sequence_to_classify, labels)
            max_score_index = result["scores"].index(max(result["scores"]))
            predicted_label = result["labels"][max_score_index]
            items.at[index, 'category'] = predicted_label

            # Assign the predicted label to the 'category' column
            items.at[index, 'category'] = predicted_label
            
            # Assign the corresponding expiration date to the 'expiration' column
            if predicted_label in food_categories:
                items.at[index, 'expiration'] = food_categories[predicted_label]
            else:
                items.at[index, 'expiration'] = None  # If no expiration date is available, should not happen though
            
        return items
    
    def post_items_to_api(self, data_list, api_url):
        # Assuming today's date is the day added, you can adjust as needed
        day_added = datetime.datetime.now().strftime("%Y-%m-%d")
        
        # Iterate through each item in the data list
        for item in data_list:
            # Prepare the data for the POST request
            post_data = {
                "name": item['name'],
                "day_added": day_added,
                "expiration_time": item.get('expiration', 'Not applicable'),  # Handling None or missing expiration
                "quantity": 1,  # Default quantity to 1, adjust as needed
                "category": item['category']
            }
            # Send the POST request to the API
            response = requests.post(api_url, json=post_data)
            print(f"Posted {item['name']} with response {response.status_code}: {response.text}")
    
