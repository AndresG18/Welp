from app.models import db, Business_image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_business_images():
    all_business_images = [

    ]

    create_business_images = [Business_image(**business_image) for business_image in all_business_images]
    add_business_images = [db.session.add(business_image) for business_image in create_business_images]
    db.session.commit()
    return create_business_images


def undo_business_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business_images"))
        
    db.session.commit()
