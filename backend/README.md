# Backend

## Setup
```
python3 -m venv .venv
source ".venv/bin/activate"
pip install --upgrade pip
pip install -r requirements.txt
```

# Run
```
flask --app ./main run
```

## Sample requests
Get All Posts
```
curl --location --request GET 'http://127.0.0.1:5000/getAllPosts'
```
This request will also delete old items

Add Item
```
curl --location --request POST 'http://127.0.0.1:5000/1/addItem' \
--header 'Content-Type: application/json' \
--data-raw '{
    "itemName": "asdlkjlkjkljasdad",
    "itemDescription": "asdasdasd"
}'
```

Create Post
```
curl --location --request POST 'http://127.0.0.1:5000/createPost' \
--header 'Content-Type: application/json' \
--data-raw '{
    "lat": "52.51056620481168",
    "lng": "13.466203931227092"
}'
```

Delete Item 1
```
curl --location --request DELETE 'http://127.0.0.1:5000/1/deleteItem'
```

Search for Adidas
```
curl --location --request GET 'http://127.0.0.1:5000/search?query=adidas'
```