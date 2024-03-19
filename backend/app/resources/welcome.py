from flask_restful import Resource
from flask import jsonify

class Welcome(Resource):
    def get(self):
        data = {'message': 'Start Page!'}
        return jsonify(data)
