from flask import Flask

app = Flask(__name__)

@app.route('/getAllPosts', methods=['GET'])
def getAllPosts():
    return  {
        'posts': [
            {   
                'id' : 1,
                'createdAt' : 00000000,
                'coordinates' : "222.22, 221.22",
                'items' : [
                    {
                        'itemName' : "testName",
                        'itemId' : 1,
                        'postId' : 1
                    }
                ] 
            }
    ]}

@app.route('/createPost', methods=['POST'])
def createPost():
    return 1


@app.route('/<postId>/addItem, addItem', methods=['POST'])
def addItem(postId):
    return 1

@app.route('/<itemId>/deleteItem', methods=['DELETE'])
def deleteItem(itemId):
    return 1
