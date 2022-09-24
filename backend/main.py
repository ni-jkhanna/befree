from flask import Flask
from flask_cors import CORS
from flask import request
from data import create_test_data
from dal import Dal
import json
import time


TTL_POST = 2#days

app = Flask(__name__)
db = Dal()
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
create_test_data()

def cleanExpiredPosts():
    ## revert to previous ttl
    cutoffDate = time.time() - TTL_POST*60/2
    db.cleanupBefore(cutoffDate)


@app.route('/getAllPosts', methods=['GET'])
def getAllPosts():
    cleanExpiredPosts()
    return  json.dumps(db.getAllPosts())

# @app.route('/search', methods=['GET'])
# def search():
#     posts = db.getAllPosts()


@app.route('/createPost', methods=['POST'])
def createPost():
    data = request.json
    id = db.createPost(data.get('lat'), data.get('lng'))
    return id

@app.route('/<postId>/addItem', methods=['POST'])
def addItem(postId):
    data = request.json
    db.createItem(postId, data.get("itemName"), data.get("itemDescription"))
    db.updateTimestampPost(postId)
    return postId

@app.route('/<itemId>/deleteItem', methods=['DELETE'])
def deleteItem(itemId):
    itemToDelete = db.getItem(itemId)
    db.deleteItem(itemId)
    samePostItems = db.getItemsForPostId(itemToDelete.get('post_id'))
    if len(samePostItems) == 0:
        db.deletePost(itemToDelete.get('post_id'))
    return itemId