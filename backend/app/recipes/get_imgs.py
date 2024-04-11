#search imgs from internet and save them in the database, according to the name of the recipe in the ./recipes.json file
# Path: backend/app/recipes/get_imgs.py
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import json
import os
from PIL import Image
from io import BytesIO

class GetImgs():
    def get(self):
        with open('../recipes/recipes.json', 'r') as read_file:
            data = json.load(read_file)
        for recipe in data.values():
            recipe_name = recipe.get('recipe_name')
            #save 1 image per recipe
            if recipe_name:
                recipe_name = recipe_name.replace(' ', '+')
                url = f'https://picturetherecipe.com/?s={recipe_name}'
                response = requests.get(url)
                soup = BeautifulSoup(response.text, 'html.parser')
                img_tags = soup.find_all('img')
                img_url = None
                for img_tag in img_tags:
                    img_url = img_tag.get('src')
                    if img_url:
                        break  
                if img_url:
                    img_response = requests.get(img_url)
                    img = Image.open(BytesIO(img_response.content))
                    img.save(f'./imgs/{recipe_name}.jpg')
    
if __name__ == '__main__':
    GetImgs().get()
