from flask import Flask
from dal import Dal

#TODO logic for the deletion upon expiration 
app = Flask(__name__)
db = Dal()


@app.route('/getAllPosts', methods=['GET'])
def getAllPosts():
    return  db.getAllPosts()

@app.route('/createPost', methods=['POST'])
def createPost(coordinates):
    return db.createPost(coordinates.get('lat'),coordinates.get('lon'))


@app.route('/<postId>/addItem, addItem', methods=['POST'])
def addItem(postId):
    return 1

@app.route('/<itemId>/deleteItem', methods=['DELETE'])
def deleteItem(itemId):
    return 1


id = createPost({'lat':2,"lon":1})
id = createPost({'lat':3,"lon":4})
print(getAllPosts())