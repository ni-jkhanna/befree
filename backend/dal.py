import sqlite3
import time


db_name = "befree.db"

class Dal:
    def __init__(self) -> None:
        self.con = sqlite3.connect(db_name, check_same_thread=False)
        self.run_migrations()

    def run_migrations(self):
        cur = self.con.cursor()
        cur.execute("CREATE TABLE IF NOT EXISTS posts(post_id INTEGER PRIMARY KEY AUTOINCREMENT, latitude DOUBLE, longitude DOUBLE, created_at LONG)")
        cur.execute("CREATE TABLE IF NOT EXISTS items(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name STRING, item_description STRING, post_id INTEGER, created_at LONG, FOREIGN KEY (post_id) REFERENCES posts(post_id))")
        
    def getAllPosts(self):
        cur = self.con.cursor()
        posts = []
        output  = cur.execute("SELECT * FROM posts")
        posts = []
        for post in output:
            post = {"post_id": post[0], "lat": post[1], "lng": post[2], "created_at": post[3]}
            posts.append(post)
        for post in posts:
            post_id = post["post_id"]
            items_res = cur.execute(f"SELECT * FROM items WHERE post_id = {post_id}")
            items = []
            for item in items_res:
                item_dict = {"item_id": item[0], "item_name": item[1], "item_description": item[2]}
                items.append(item_dict)
            post["items"] = items
        return posts


    def createPost(self, lat, lon):
        cur = self.con.cursor()
        now = time.time()
        cur.execute("""INSERT INTO posts (latitude, longitude, created_at) VALUES ({}, {}, {})""".format(lat, lon, now))
        last_id =  cur.lastrowid
        self.con.commit()
        return {
            "post_id": last_id,
            "lat": lat,
            "lng": lon,
            "created_at": now,
            "items": []
        }

    def updateTimestampPost(self,post_id):
        cur = self.con.cursor()
        return cur.execute(f"UPDATE posts SET created_at = {time.time()} WHERE post_id={post_id}")
        
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

    def deletePost(self, post_id):
        cur = self.con.cursor()
        cur.execute("""
            DELETE FROM posts WHERE post_id = {}""".format(post_id)
        )
        self.con.commit()

    def cleanupBefore(self, timestamp_cutoff):
        cur = self.con.cursor()
        cur.execute(f"""
            DELETE FROM posts WHERE created_at <= {timestamp_cutoff}
        """)
        cur.execute(f"""
            DELETE FROM items WHERE created_at <= {timestamp_cutoff}
        """)
        self.con.commit()


    def getItem(self, id):
        cur = self.con.cursor()
        items = cur.execute(f"""
            SELECT * FROM items WHERE item_id = {id}
        """)
        item_dict = {}
        for item in items:
            item_dict = {"item_id": item[0], "item_name": item[1], "item_description": item[2], "post_id": item[3]}
        return item_dict

    def getItemsForPostId(self,post_id):
        cur = self.con.cursor()
        items = cur.execute(f"""
            SELECT * FROM items WHERE post_id = {post_id}
        """)
        itemsList = []
        for item in items:
            item_dict = {"item_id": item[0], "item_name": item[1], "item_description": item[2]}
            itemsList.append(item_dict) 

        return itemsList

    def closeCon(self):
        self.con.close()