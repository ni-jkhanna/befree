import sqlite3
import time


db_name = "befree.db"

class Dal:
    def __init__(self) -> None:
        self.con = sqlite3.connect(db_name)
        self.run_migrations()

    def close_conn(self):
        self.con.close()

    def run_migrations(self):
        cur = self.con.cursor()
        cur.execute("CREATE TABLE IF NOT EXISTS posts(post_id INTEGER PRIMARY KEY AUTOINCREMENT, latitude DOUBLE, longitude DOUBLE, created_at LONG)")
        cur.execute("CREATE TABLE IF NOT EXISTS items(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name STRING, item_description STRING, post_id INTEGER, created_at LONG, FOREIGN KEY (post_id) REFERENCES posts(post_id))")
        
    def getAllPosts(self):
        cur = self.con.cursor()
        posts = []
        output  = cur.execute("SELECT * FROM posts")
        for post in output:
            items_res = cur.execute(f"SELECT * FROM items WHERE post_id = {post[0]}")
            items = []
            for item in items_res:
                item_dict = {"item_id": item[0], "item_name": item[1], "item_description": item[2]}
                items.append(item_dict)
            post = {"post_id": post[0], "latitude": post[1], "longitude": post[2], "created_at": post[3], "items": items}
            posts.append(post)
        return posts


    def createPost(self, lat, lon):
        cur = self.con.cursor()
        cur.execute("""
            INSERT INTO posts (latitude, longitude, created_at) VALUES
                ({}, {}, {})""".format(lat, lon, time.time())
        )
        self.con.commit()

    def createItem(self,post_id,item_name,description):
        cur = self.con.cursor()
        cur.execute("""INSERT INTO items (item_name, item_description, post_id, created_at) VALUES ('{}', '{}', {}, {})""".format(item_name, description, post_id, time.time()))
        self.con.commit()

    def deleteItem(self, item_id):
        cur = self.con.cursor()
        cur.execute("""
            DELETE FROM items WHERE item_id = {}""".format(item_id)
        )
        self.con.commit()

    def closeCon(self):
        self.con.close()