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
        cur.execute("CREATE TABLE IF NOT EXISTS items(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name STRING, post_id INTEGER,  created_at LONG, FOREIGN KEY (post_id) REFERENCES posts(post_id) )")
        
    def getAllPosts(self):
        cur = self.con.cursor()
        posts = []
        output  = cur.execute("SELECT * FROM posts")
        for post in output:
            print(post)

            list(post).append(cur.execute(f"SELECT * FROM items WHERE items.post_id = {post[0]}"))
            posts.append(post)
        return posts


    def createPost(self, lat, lon):
        cur = self.con.cursor()
        cur.execute("""
            INSERT INTO posts (latitude, longitude, created_at) VALUES
                ({}, {}, {})""".format(lat, lon, time.time())
        )
        self.con.commit()
