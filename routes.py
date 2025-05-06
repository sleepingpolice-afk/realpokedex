from flask import Blueprint, request, jsonify, Response
from bson import json_util
from db import mongo
from models import is_valid_pokemon

pokemon_bp = Blueprint('pokemon', __name__)


@pokemon_bp.route('/pokemon', methods=['POST'])
def create_pokemon():
    data = request.json
    if not data or not is_valid_pokemon(data):
        return jsonify({'error': 'Invalid or incomplete Pokémon data'}), 400

    inserted = mongo.db.pokemon.insert_one(data)

    return jsonify({'message': 'Pokémon added', 'id': str(inserted.inserted_id)}), 201

@pokemon_bp.route('/pokemon', methods=['GET'])
def get_pokemon():
    # pokemon = list(mongo.db.pokemon.find({}, {'_id': 0}))  # Exclude _id for JSON compatibility
    # return jsonify(pokemon), 200
    pokemon = mongo.db.pokemon.find()
    response = json_util.dumps(pokemon)
    return Response(response, mimetype='application/json')

@pokemon_bp.route('/pokemon/<name>', methods=['DELETE'])
def delete_pokemon(name):
    result = mongo.db.pokemon.delete_one({'name': name})
    if result.deleted_count == 0:
        return jsonify({'error': 'Pokémon not found'}), 404
    return jsonify({'message': 'Pokémon deleted'}), 200

@pokemon_bp.route('/pokemon/<name>', methods=['PUT'])
def update_pokemon(name):
    data = request.json
    if not data or not is_valid_pokemon(data):
        return jsonify({'error': 'Invalid or incomplete Pokémon data'}), 400

    result = mongo.db.pokemon.update_one({'name': name}, {'$set': data})
    if result.matched_count == 0:
        return jsonify({'error': 'Pokémon not found'}), 404

    return jsonify({'message': 'Pokémon updated'}), 200

@pokemon_bp.route('/pokemon/search', methods=['GET'])
def search_pokemon():
    query = {}
    pokemon_type = request.args.get('type')
    min_hp = request.args.get('min_hp')

    if pokemon_type:
        query['type'] = pokemon_type
    if min_hp:
        query['stats.hp'] = {'$gte': int(min_hp)}

    results = mongo.db.pokemon.find(query)
    return Response(json_util.dumps(results), mimetype='application/json')


