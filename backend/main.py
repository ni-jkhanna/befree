from flask import Flask
from flask_cors import CORS, cross_origin
from dal import Dal

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = Dal()

@app.route('/getAllPosts', methods=['GET'])
def getAllPosts():
    return  db.getAllPosts()

@app.route('/createPost', methods=['POST'])
def createPost(coordinates):
    return db.createPost(coordinates.get('lat'),coordinates.get('lng'))


@app.route('/<postId>/addItem', methods=['POST'])
def addItem(postId, itemName, itemDescription):
    return db.createItem(postId, itemName, itemDescription)

@app.route('/<itemId>/deleteItem', methods=['DELETE'])
def deleteItem(itemId):
    return 1
    
db.closeCon()