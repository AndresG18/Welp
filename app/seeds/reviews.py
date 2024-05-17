from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    all_reviews = [
        {"user_id": 2, "business_id": 1, "review": "Lovely pastries, but the service was a bit slow.", "star_rating": 3},
        {"user_id": 3, "business_id": 1, "review": "The croissants are amazing! Highly recommend.", "star_rating": 5},
        {"user_id": 4, "business_id": 1, "review": "Good selection, but found it a bit pricey.", "star_rating": 2},
        {"user_id": 1, "business_id": 2, "review": "Fresh bread every time. My favorite bakery.", "star_rating": 5},
        {"user_id": 3, "business_id": 2, "review": "Great sourdough, but could use more variety.", "star_rating": 4},
        {"user_id": 4, "business_id": 2, "review": "Not impressed, expected more variety.", "star_rating": 2},
        {"user_id": 1, "business_id": 3, "review": "Best cupcakes I've ever had!", "star_rating": 5},
        {"user_id": 2, "business_id": 3, "review": "Delicious cakes, but a bit too sweet for my taste.", "star_rating": 3},
        {"user_id": 4, "business_id": 3, "review": "Good, but the service was slow.", "star_rating": 2},
        {"user_id": 1, "business_id": 4, "review": "Great bakery with a wide variety.", "star_rating": 4},
        {"user_id": 2, "business_id": 4, "review": "Loved the pastries, will come again.", "star_rating": 5},
        {"user_id": 3, "business_id": 4, "review": "Decent selection, but nothing extraordinary.", "star_rating": 2},
        {"user_id": 2, "business_id": 5, "review": "Fantastic food and great atmosphere.", "star_rating": 5},
        {"user_id": 3, "business_id": 5, "review": "Good food, but a bit pricey.", "star_rating": 3},
        {"user_id": 4, "business_id": 5, "review": "Not bad, but I've had better.", "star_rating": 2},
        {"user_id": 1, "business_id": 6, "review": "Excellent BBQ, highly recommend.", "star_rating": 5},
        {"user_id": 3, "business_id": 6, "review": "Great meat, but sides were just okay.", "star_rating": 3},
        {"user_id": 4, "business_id": 6, "review": "Good food, but slow service.", "star_rating": 2},
        {"user_id": 1, "business_id": 7, "review": "Fresh seafood with a great view.", "star_rating": 5},
        {"user_id": 2, "business_id": 7, "review": "Good seafood, but the service was lacking.", "star_rating": 2},
        {"user_id": 4, "business_id": 7, "review": "Not a fan, found it overrated.", "star_rating": 1},
        {"user_id": 1, "business_id": 8, "review": "Hearty breakfast, loved the pancakes.", "star_rating": 4},
        {"user_id": 2, "business_id": 8, "review": "Classic diner feel, but food was average.", "star_rating": 3},
        {"user_id": 3, "business_id": 8, "review": "Great service and good food.", "star_rating": 4},
        {"user_id": 2, "business_id": 9, "review": "Best coffee in town!", "star_rating": 5},
        {"user_id": 3, "business_id": 9, "review": "Charming cafe, but coffee was just okay.", "star_rating": 3},
        {"user_id": 4, "business_id": 9, "review": "Good place to relax with a book.", "star_rating": 4},
        {"user_id": 1, "business_id": 10, "review": "Cozy atmosphere and great coffee.", "star_rating": 5},
        {"user_id": 3, "business_id": 10, "review": "Loved the coffee and the ambiance.", "star_rating": 4},
        {"user_id": 4, "business_id": 10, "review": "Good coffee, but a bit crowded.", "star_rating": 3},
        {"user_id": 1, "business_id": 11, "review": "Refreshing smoothies and good coffee.", "star_rating": 4},
        {"user_id": 2, "business_id": 11, "review": "Nice beach vibe, but the coffee was average.", "star_rating": 2},
        {"user_id": 4, "business_id": 11, "review": "Good place to unwind by the beach.", "star_rating": 4},
        {"user_id": 1, "business_id": 12, "review": "Loved the rustic vibe and coffee.", "star_rating": 5},
        {"user_id": 2, "business_id": 12, "review": "Good coffee, but the service was slow.", "star_rating": 2},
        {"user_id": 3, "business_id": 12, "review": "Nice cafe, but a bit expensive.", "star_rating": 3},
        {"user_id": 2, "business_id": 13, "review": "Great variety of groceries.", "star_rating": 4},
        {"user_id": 3, "business_id": 13, "review": "Convenient and well-stocked.", "star_rating": 5},
        {"user_id": 4, "business_id": 13, "review": "Good selection, but some items were overpriced.", "star_rating": 2},
        {"user_id": 1, "business_id": 14, "review": "Good local goods, loved the crafts.", "star_rating": 4},
        {"user_id": 3, "business_id": 14, "review": "Interesting selection, but a bit pricey.", "star_rating": 3},
        {"user_id": 4, "business_id": 14, "review": "Decent place, but found it a bit lacking.", "star_rating": 2},
        {"user_id": 1, "business_id": 15, "review": "Loved the variety of tropical fruits.", "star_rating": 5},
        {"user_id": 2, "business_id": 15, "review": "Good selection, but some items were overpriced.", "star_rating": 3},
        {"user_id": 4, "business_id": 15, "review": "Not bad, but expected more variety.", "star_rating": 2},
        {"user_id": 1, "business_id": 16, "review": "Great local products and friendly staff.", "star_rating": 5},
        {"user_id": 2, "business_id": 16, "review": "Interesting selection of items.", "star_rating": 4},
        {"user_id": 3, "business_id": 16, "review": "Good store, but could use more variety.", "star_rating": 3}
    ]

    create_reviews = [Review(**review) for review in all_reviews]
    add_reviews = [db.session.add(review) for review in create_reviews]
    db.session.commit()
    return create_reviews



def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()
