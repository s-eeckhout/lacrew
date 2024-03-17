from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from .api.routes import api_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api_bp)

    return app
