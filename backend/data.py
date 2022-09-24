from dal import Dal

def create_test_data():
    db = Dal()
    posts = [
        {
            "lat": "52.51056620481168",
            "lng": "13.466203931227092"
        },
        {
            "lat": "52.50976304048138",
            "lng": "13.467201712951642"
        },
        {
            "lat": "52.511751741684606",
            "lng": "13.46969089987405"
        }
    ]
    for post in posts:
        db.createPost(post.get("lat"), post.get("lng"))

    db.createItem(1, "Shoes", "Adidas sports")
    db.createItem(1, "Phone", "iPhone 11")
    db.createItem(2, "Kettle", "Tea Kettle")
    db.createItem(2, "DVD", "King Kong DVD")
    db.createItem(3, "Jacket", "Black Nike Winter Jacket")