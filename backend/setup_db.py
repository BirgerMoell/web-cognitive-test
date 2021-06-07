import sqlite3
import os

def setup_db(filename):
    # Remove db file and reset db
    os.remove(filename)
    con = sqlite3.connect(filename)
    cur = con.cursor()
    # Create table
    cur.execute('''CREATE TABLE "users"
                (name text, email text, password text, conversations list, create_date text, admin bool, user_id real)''')
    
    # Create table
    cur.execute('''CREATE TABLE "conversations"
                (id text, messages list)''')

    cur.execute('''CREATE TABLE "friends"
                (id text, messages list)''')
    
    # Create table
    cur.execute('''CREATE TABLE "messa"
                (id text, messages list)''')
    

#     cur.executemany("""
#     INSERT INTO 
#         mytable
#         (id, price, type)
#     VALUES
#         (%(id)s, %(price)s, %(type)s)
# """, lst)
    con.commit()
    con.close()

def enter_data(filename):
    con = sqlite3.connect(filename)
    cur = con.cursor()
    # Insert a row of data
    cur.execute("INSERT INTO users VALUES ('Birger','birger.moell@gmail.com','pass1','2021-04-21',true,10)")
    con.commit()
    con.close()

