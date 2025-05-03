from collections.abc import Collection
from flask import Flask, Response, request, jsonify
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId

app = Flask(__name__)

# Local MongoDB
app.config["MONGO_URI"] = "mongodb+srv://wesley:OxvN1V3BTnrCOLvS@wesley.m99c9ig.mongodb.net/kelompoksbd?retryWrites=true&w=majority&appName=Wesley"
# OR use your MongoDB Atlas URI:
# app.config["MONGO_URI"] = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mydatabase?retryWrites=true&w=majority"

def is_valid_pokemon(data):
    required_fields = ["name", "type", "abilities", "stats", "moves", "evolution", "description"]
    stats_fields = ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed"]
    evolution_fields = ["evolvesFrom", "evolvesTo"]

    if not all(field in data for field in required_fields):
        return False

    if not isinstance(data["type"], list) or not isinstance(data["abilities"], list) or not isinstance(data["moves"], list):
        return False

    if not isinstance(data["stats"], dict) or not all(stat in data["stats"] for stat in stats_fields):
        return False

    if not isinstance(data["evolution"], dict) or not all(ev in data["evolution"] for ev in evolution_fields):
        return False

    return True


mongo = PyMongo(app)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    print("Incoming data:", data)  # Debugging line
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({'error': 'Missing data'}), 400
    mongo.db.users.insert_one({'name': data['name'], 'email': data['email']})
    return jsonify({'message': 'User added'}), 201

@app.route('/pokemon', methods=['POST'])
def create_pokemon():
    data = request.json
    if not data or not is_valid_pokemon(data):
        return jsonify({'error': 'Invalid or incomplete Pokémon data'}), 400

    inserted = mongo.db.pokemon.insert_one(data)

    return jsonify({'message': 'Pokémon added', 'id': str(inserted.inserted_id)}), 201

@app.route('/pokemon', methods=['GET'])
def get_pokemon():
    # pokemon = list(mongo.db.pokemon.find({}, {'_id': 0}))  # Exclude _id for JSON compatibility
    # return jsonify(pokemon), 200
    pokemon = mongo.db.pokemon.find()
    response = json_util.dumps(pokemon)
    return Response(response, mimetype='application/json')

@app.route('/users', methods=['GET'])
def get_users():
    # users = list(mongo.db.users.find({}, {'_id': 0}))  # Exclude _id for JSON compatibility
    
    # return jsonify(users), 200
    user = mongo.db.users.find()
    response = json_util.dumps(user)
    return Response(response, mimetype='application/json')

@app.route('/users/<name>', methods=['GET'])
def get_user(name):
    user = mongo.db.users.find_one({'name': name})
    if user:
        response = json_util.dumps(user)
        return Response(response, mimetype='application/json')
    return jsonify({'error': 'User not found'}), 404

@app.route('/users/<name>', methods=['DELETE'])
def delete_user(name):
    result = mongo.db.users.delete_one({'name': name})
    if result.deleted_count == 0:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'message': 'User deleted'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    

