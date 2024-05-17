from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    all_categories = [
        {"name": "Bakery"},
        {"name": "Restaurant"},
        {"name": "Cafe"},
        {"name": "Store"}
    ]

    create_categories = [Category(**category) for category in all_categories]
    add_categories = [db.session.add(category) for category in create_categories]
    db.session.commit()
    return create_categories


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))
        
    db.session.commit()