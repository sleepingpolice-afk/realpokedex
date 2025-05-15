from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from db import mongo
from routes import pokemon_bp
from config import Config


app = Flask(__name__)

# MongoDB Atlas
app.config.from_object(Config)
mongo.init_app(app)
app.register_blueprint(pokemon_bp)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)
    

