from app.models import db, Business_image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_business_images():
    all_business_images = [
        {
            "business_id": 1,
            "url": "https://images.unsplash.com/photo-1583338917451-face2751d8d5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 1,
            "url": "https://images.unsplash.com/photo-1587241321921-91a834d6d191?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 1,
            "url": "https://images.unsplash.com/photo-1579697096985-41fe1430e5df?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 2,
            "url": "https://images.unsplash.com/photo-1611279522012-6c3e2d2c604f?q=80&w=2821&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 2,
            "url": "https://images.unsplash.com/photo-1632175771754-4c413217669f?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 2,
            "url": "https://images.unsplash.com/photo-1604200657090-ae45994b2451?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 3,
            "url": "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 3,
            "url": "https://images.unsplash.com/photo-1604200657090-ae45994b2451?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 3,
            "url": "https://images.unsplash.com/photo-1632175771754-4c413217669f?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 4,
            "url": "https://images.unsplash.com/photo-1604200657090-ae45994b2451?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 4,
            "url": "https://images.unsplash.com/photo-1632175771754-4c413217669f?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 4,
            "url": "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
    ]

    create_business_images = [Business_image(**business_image) for business_image in all_business_images]
    for business_image in create_business_images:
        db.session.add(business_image)
    db.session.commit()
    return create_business_images


def undo_business_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business_images"))
        
    db.session.commit()