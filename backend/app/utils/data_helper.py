import json
from flask import current_app as app
from pathlib import Path

def load_data():
    with open(Path(app.root_path) / 'resources' / 'fridge_content.json', 'r') as f:
        return json.load(f)

def load_recipes():
    with open(Path(app.root_path) / 'recipes' / 'recipes.json', 'r') as f:
        return json.load(f)
    
def save_data(data):
    with open(Path(app.root_path) / 'resources' / 'fridge_content.json', 'w') as f:
        json.dump(data, f, indent=4)
