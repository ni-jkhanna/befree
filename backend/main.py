from flask import Flask
from flask_cors import CORS
from dal import Dal
import json
import time

TTL_POST = 2#days
app = Flask(__name__)
db = Dal()


@app.route('/getAllPosts', methods=['GET'])
def getAllPosts():
    return  json.dumps(db.getAllPosts())

@app.route('/createPost', methods=['POST'])
def createPost(coordinates):
    id = db.createPost(coordinates.get('lat'),coordinates.get('lon'))

    return id


@app.route('/<postId>/addItem', methods=['POST'])
def addItem(postId, itemName, itemDescription):
    res = db.createItem(postId, itemName, itemDescription)
    db.updateTimestampPost(postId)
    return res

@app.route('/<itemId>/deleteItem', methods=['DELETE'])
def deleteItem(itemId):
    itemToDelete = db.getItem(itemId)
    samePostItems = db.getItemsForPostId(itemToDelete.get('post_id'))
    deletedId = db.deleteItem(itemId)
    if len(samePostItems) == 0:
        db.deletePost(itemToDelete.get('post_id'))
    return deletedId




def cleanExpiredPosts():
    cutoffDate = time.time() - TTL_POST*24*60*60*100
    db.cleanupBefore(cutoffDate)