from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text

def seed_businesses():
    all_businesses = [
        # BAKERIES------------------------------------------------------------
        {
            "owner_id": 1,
            "category_id": 1,
            "name": "Sweet Delights",
            "address": "123 Maple St",
            "city": "Seattle",
            "state": "WA",
            "hours": "7AM-7PM",
            "days_open": "Mon-Sun",
            "latitude": 47.6097,
            "longitude": -122.3331,
            "description": "Cozy bakery offering freshly baked pastries, cakes, and bread.",
            "price": "Low",
            "preview_image": "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 2,
            "category_id": 1,
            "name": "Bread Heaven",
            "address": "456 Pine St",
            "city": "Austin",
            "state": "TX",
            "hours": "6AM-6PM",
            "days_open": "Mon-Sat",
            "latitude": 30.2672,
            "longitude": -97.7431,
            "description": "Artisanal bakery specializing in sourdough and whole grain breads.",
            "price": "Medium",
            "preview_image": "https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 3,
            "category_id": 1,
            "name": "Cake Corner",
            "address": "789 Oak St",
            "city": "Miami",
            "state": "FL",
            "hours": "8AM-8PM",
            "days_open": "Tue-Sun",
            "latitude": 25.7617,
            "longitude": -80.1918,
            "price": "High",
            "description": "Family-owned bakery known for custom cakes and cupcakes.",
            "preview_image": "https://plus.unsplash.com/premium_photo-1661723080468-ef7ff12f909f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 4,
            "category_id": 1,
            "name": "The Bread Basket",
            "address": "321 Elm St",
            "city": "Denver",
            "state": "CO",
            "hours": "7AM-7PM",
            "days_open": "Mon-Fri",
            "latitude": 39.7392,
            "longitude": -104.9903,
            "description": "Cozy bakery offering freshly baked pastries, cakes, and bread.",
            "price": "Low",
            "preview_image": "https://plus.unsplash.com/premium_photo-1665669263531-cdcbe18e7fe4?q=80&w=3025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

        # RESTAURANTS-------------------------------------------------
        {
            "owner_id": 1,
            "category_id": 2,
            "name": "Seattle Eats",
            "address": "1111 Birch St",
            "city": "Seattle",
            "state": "WA",
            "hours": "7AM-7PM",
            "days_open": "Mon-Sun",
            "latitude": 47.6097,
            "longitude": -122.3331,
            "description": "Modern restaurant serving a fusion of global cuisines.",
            "price": "Medium",
            "preview_image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 2,
            "category_id": 2,
            "name": "Texas Grill",
            "address": "2222 Cedar Ln",
            "city": "Austin",
            "state": "TX",
            "hours": "6AM-6PM",
            "days_open": "Mon-Sat",
            "latitude": 30.2672,
            "longitude": -97.7431,
            "description": "Grilled meats, BBQ, and a flare for the casual.",
            "price": "High",
            "preview_image": "https://images.unsplash.com/photo-1708388064322-c15cca1f86a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VGV4YXMlMjBHcmlsbHxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            "owner_id": 3,
            "category_id": 2,
            "name": "Ocean Breeze",
            "address": "3333 Ocean St",
            "city": "Miami",
            "state": "FL",
            "hours": "8AM-8PM",
            "days_open": "Tue-Sun",
            "latitude": 25.7617,
            "longitude": -80.1918,
            "description": "Great seafood with an ocean side view.",
            "price": "Low",
            "preview_image": "https://images.unsplash.com/photo-1579783411194-f697db862dcd?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 4,
            "category_id": 2,
            "name": "Mountain Diner",
            "address": "4444 Hightower St",
            "city": "Denver",
            "state": "CO",
            "hours": "7AM-7PM",
            "days_open": "Mon-Fri",
            "latitude": 39.7392,
            "longitude": -104.9903,
            "description": "Classic diner serving hearty American meals.",
            "price": "Medium",
            "preview_image": "https://images.unsplash.com/photo-1579236546973-39f510ef2a37?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

                # CAFES-------------------------------------------------------------------------
        {
            "owner_id": 1,
            "category_id": 3,
            "name": "Seattle Sips",
            "address": "5555 Willow St",
            "city": "Seattle",
            "state": "WA",
            "hours": "7AM-7PM",
            "days_open": "Mon-Sun",
            "latitude": 47.6097,
            "longitude": -122.3331,
            "description": "Great coffee, ridiculous prices.",
            "price": "Low",
            "preview_image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 2,
            "category_id": 3,
            "name": "Austin Brews",
            "address": "6666 Rowan Ln",
            "city": "Austin",
            "state": "TX",
            "hours": "6AM-6PM",
            "days_open": "Mon-Sat",
            "latitude": 30.2672,
            "longitude": -97.7431,
            "description": "Hip cafe known for artisanal coffee and cozy atmosphere.",
            "price": "Low",
            "preview_image": "https://cdn.vox-cdn.com/thumbor/tTf--qzZSDhcfD7-gteoMM4cVM0=/0x0:5461x3641/1170x878/filters:focal(2295x1385:3167x2257):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/71974835/Nelita_2__cred_Clayton_Vieira.0.jpeg"
        },
        {
            "owner_id": 3,
            "category_id": 3,
            "name": "Cafe Tropics",
            "address": "7777 Sunset St",
            "city": "Miami",
            "state": "FL",
            "hours": "8AM-8PM",
            "days_open": "Tue-Sun",
            "latitude": 25.7617,
            "longitude": -80.1918,
            "description": "Music, hula, and a myriad of exotic and tropical drinks.",
            "price": "Medium",
            "preview_image": "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 4,
            "category_id": 3,
            "name": "Rocky Mountain",
            "address": "8888 Granite St",
            "city": "Denver",
            "state": "CO",
            "hours": "7AM-7PM",
            "days_open": "Mon-Fri",
            "latitude": 39.7392,
            "longitude": -104.9903,
            "description": "Mountain-themed cafe with a rustic vibe and locally sourced coffee.",
            "price": "Low",
            "preview_image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

        # STORES-------------------------------------------------------------------------
        {
            "owner_id": 1,
            "category_id": 4,
            "name": "Market Place",
            "address": "200 Main St",
            "city": "Seattle",
            "state": "WA",
            "hours": "7AM-7PM",
            "days_open": "Mon-Sun",
            "latitude": 47.6097,
            "longitude": -122.3331,
            "description": "General store offering a variety of groceries and household items.",
            "price": "Medium",
            "preview_image": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 2,
            "category_id": 4,
            "name": "Texas General",
            "address": "300 Central Ave",
            "city": "Austin",
            "state": "TX",
            "hours": "6AM-6PM",
            "days_open": "Mon-Sat",
            "latitude": 30.2672,
            "longitude": -97.7431,
            "description": "Local store known for its selection of local goods and crafts.",
            "price": "Medium",
            "preview_image": "https://media.gettyimages.com/id/993367404/photo/market-stall.jpg?s=612x612&w=0&k=20&c=vKHmiNo_Nc4ijtg0eRiBV6jmr57VaOfrVjY30HIIKOs="
        },
        {
            "owner_id": 3,
            "category_id": 4,
            "name": "Tropic Mart",
            "address": "400 Ocean Dr",
            "city": "Miami",
            "state": "FL",
            "hours": "8AM-8PM",
            "days_open": "Tue-Sun",
            "latitude": 25.7617,
            "longitude": -80.1918,
            "description": "Grocery store specializing in tropical fruits and international foods.",
            "price": "Low",
            "preview_image": "https://images.unsplash.com/photo-1526399743290-f73cb4022f48?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 4,
            "category_id": 4,
            "name": "Denver Goods",
            "address": "500 Peak St",
            "city": "Denver",
            "state": "CO",
            "hours": "7AM-7PM",
            "days_open": "Mon-Fri",
            "latitude": 39.7392,
            "longitude": -104.9903,
            "description": "Store offering a wide range of local products and artisan goods.",
            "price": "High",
            "preview_image": "https://images.unsplash.com/photo-1611279522012-6c3e2d2c604f?q=80&w=2821&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 1,
            "category_id": 1,
            "name": "Delicious Bakes",
            "address": "100 Baker St",
            "city": "San Francisco",
            "state": "CA",
            "hours": "7AM-7PM",
            "days_open": "Mon-Sun",
            "latitude": 37.7749,
            "longitude": -122.4194,
            "description": "Artisan bakery offering a variety of freshly baked breads, pastries, and cakes.",
            "price": "Medium",
            "preview_image": "https://plus.unsplash.com/premium_photo-1663050741659-6def151d907f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 2,
            "category_id": 2,
            "name": "Gourmet Feast",
            "address": "200 Gourmet St",
            "city": "New York",
            "state": "NY",
            "hours": "5PM-11PM",
            "days_open": "Tue-Sun",
            "latitude": 40.7128,
            "longitude": -74.0060,
            "description": "Fine dining restaurant offering a diverse menu with gourmet dishes.",
            "price": "High",
            "preview_image": "https://plus.unsplash.com/premium_photo-1682097213026-ae6418008e8a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 3,
            "category_id": 3,
            "name": "Urban Coffee",
            "address": "300 Urban St",
            "city": "Chicago",
            "state": "IL",
            "hours": "6AM-6PM",
            "days_open": "Mon-Fri",
            "latitude": 41.8781,
            "longitude": -87.6298,
            "description": "Trendy cafe known for its specialty coffee and relaxed atmosphere.",
            "price": "Low",
            "preview_image": "https://plus.unsplash.com/premium_photo-1670445287612-d6fed960c910?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "owner_id": 4,
            "category_id": 4,
            "name": "Green Market",
            "address": "400 Market St",
            "city": "Portland",
            "state": "OR",
            "hours": "8AM-8PM",
            "days_open": "Mon-Sun",
            "latitude": 45.5152,
            "longitude": -122.6784,
            "description": "Local market offering organic and locally sourced products.",
            "price": "Medium",
            "preview_image": "https://plus.unsplash.com/premium_photo-1679438493858-ed7c1f51da60?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

    ]

    create_businesses = [Business(**business) for business in all_businesses]
    add_businesses = [db.session.add(business) for business in create_businesses]
    db.session.commit()
    return create_businesses


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
