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
        cur.execute("CREATE TABLE IF NOT EXISTS posts(post_id INTEGER PRIMARY KEY AUTOINCREMENT, latitude DOUBLE, longitude DOUBLE, created_at DOUBLE)")
        cur.execute("CREATE TABLE IF NOT EXISTS items(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name STRING, FOREIGN KEY (post_id) REFERENCES posts (post_id) )")
        
    def getAllPosts(self):
        pass

    def createPost(self, lat, lon):
        cur = self.con.cursor()
        cur.execute("""
            INSERT INTO post VALUES
                ({0}, {1}, {2})""".format(lat, lon, time.time())
        )
        self.con.commit()
