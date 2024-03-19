from flask_restful import Resource
from flask import jsonify


class HelloWorld(Resource):
    def get(self):
        data = {'message': 'Hello, world!'}
        return jsonify(data)