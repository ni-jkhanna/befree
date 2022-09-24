from flask import Flask
from flask_cors import CORS
from dal import Dal
import json

#TODO logic for the deletion upon expiration 
#TODO prefill test data
app = Flask(__name__)
db = Dal()


@app.route('/getAllPosts', methods=['GET'])
def getAllPosts():
    return  json.dumps(db.getAllPosts())

@app.route('/createPost', methods=['POST'])
def createPost(coordinates):
    return db.createPost(coordinates.get('lat'),coordinates.get('lon'))


@app.route('/<postId>/addItem', methods=['POST'])
def addItem(postId, itemName, itemDescription):
    return db.createItem(postId, itemName, itemDescription)

@app.route('/<itemId>/deleteItem', methods=['DELETE'])
def deleteItem(itemId):
    #TODO if we deleted the last one, delete the post
    return db.deleteItem(itemId)



