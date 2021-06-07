import sqlite3


# for row in cur.execute('SELECT * FROM users ORDER BY user_id'):
#         print(row)

def login(email, password):
    con = sqlite3.connect('users.db')
    cur = con.cursor()
    for row in cur.execute("SELECT * FROM users WHERE email = '%s'" % email):
        print(row)
        if row[2] == password:
           return {"user_id": row[-1], }

def get_user(user_id):
    con = sqlite3.connect('users.db')
    cur = con.cursor()
    for row in cur.execute("SELECT * FROM users WHERE user_id = '%s'" % user_id):
        print(row)

def add_message(userId, message):
    con = sqlite3.connect('users.db')
    cur = con.cursor()
    for row in cur.execute("SELECT * FROM users WHERE user_id = '%s'" % user_id):
        print(row)



#get_user(10)
#user_id = login("birger.moell@gmail.com", "banan")