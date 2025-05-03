from flask import Flask, Response, request, jsonify
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId

app = Flask(__name__)

# MongoDB Atlas
app.config["MONGO_URI"] = "mongodb+srv://wesley:OxvN1V3BTnrCOLvS@wesley.m99c9ig.mongodb.net/kelompoksbd?retryWrites=true&w=majority&appName=Wesley"

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

@app.route('/pokemon/<name>', methods=['DELETE'])
def delete_pokemon(name):
    result = mongo.db.pokemon.delete_one({'name': name})
    if result.deleted_count == 0:
        return jsonify({'error': 'Pokémon not found'}), 404
    return jsonify({'message': 'Pokémon deleted'}), 200

@app.route('/pokemon/<name>', methods=['PUT'])
def update_pokemon(name):
    data = request.json
    if not data or not is_valid_pokemon(data):
        return jsonify({'error': 'Invalid or incomplete Pokémon data'}), 400

    result = mongo.db.pokemon.update_one({'name': name}, {'$set': data})
    if result.matched_count == 0:
        return jsonify({'error': 'Pokémon not found'}), 404

    return jsonify({'message': 'Pokémon updated'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    

