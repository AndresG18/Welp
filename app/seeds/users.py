from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# def seed_users():
#     demo = User(
#         username='Demo', email='demo@aa.io', password='password')
#     marnie = User(
#         username='marnie', email='marnie@aa.io', password='password')
#     bobbie = User(
#         username='bobbie', email='bobbie@aa.io', password='password')

#     db.session.add(demo)
#     db.session.add(marnie)
#     db.session.add(bobbie)
#     db.session.commit()

#==============================================================================

def seed_users():
    all_users = [
        {
            "first_name": "Alice", 
            "last_name": "Johnson", 
            "username": "alicej123", 
            "email": "alice.johnson@example.com", 
            "hashed_password": "password1", 
            "city": "Seattle", 
            "state": "WA",
            "profile_pic": "https://cdna.artstation.com/p/assets/images/images/035/572/794/large/kieran-pavy-render-5.jpg?1615316253"
        },
        {
            "first_name": "Brian", 
            "last_name": "Smith", 
            "username": "briansmith88", 
            "email": "brian.smith@example.com", 
            "hashed_password": "password2", 
            "city": "Austin", 
            "state": "TX"
            "profile_pic": "https://cdna.artstation.com/p/assets/images/images/066/630/454/large/easy-alter-kingquest-profile-picture-inspired-by-the-word-king-quest-brigh-bb1e2839-9070-4eae-a0a4-d73e0153495d.jpg?1693381640"
        },
        {
            "first_name": "Carol", 
            "last_name": "Davis", 
            "username": "carold89", 
            "email": "carol.davis@example.com", 
            "hashed_password": "password3", 
            "city": "Miami", 
            "state": "FL",
            "profile_pic": "https://cdnb.artstation.com/p/assets/images/images/007/137/047/large/shellz-art-self-portrait-6.jpg?1503954832"
        },
        {
            "first_name": "David", 
            "last_name": "Martinez", 
            "username": "dmartinez99", 
            "email": "david.martinez@example.com", 
            "hashed_password": "password4", 
            "city": "Denver", 
            "state": "CO",
            "profile_pic": "https://cdnb.artstation.com/p/assets/images/images/024/618/307/large/moto-cat-jump12.jpg?1584528485"
        }
    ]

    create_users = [User(**user) for user in all_users]
    add_users = [db.session.add(user) for user in create_users]
    db.session.commit()
    return create_users

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
