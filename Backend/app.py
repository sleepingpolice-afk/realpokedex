from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from db import mongo
from routes import pokemon_bp
from config import Config
import os



app = Flask(__name__)
CORS(app)  # Allow all origins for development

# MongoDB Atlas
app.config.from_object(Config)
mongo.init_app(app)
app.register_blueprint(pokemon_bp)


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=5000, debug=True)
    

