from app.models import db, BusinessImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_business_images():
    all_business_images = [
        {
            "business_id": 1,
            "url": "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
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
            "url": "https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            "url": "https://plus.unsplash.com/premium_photo-1661723080468-ef7ff12f909f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            "url": "https://images.unsplash.com/photo-1546237769-6f84ec1a512a?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

        {
            "business_id": 5,
            "url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 5,
            "url": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 5,
            "url": "https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 5,
            "url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 6,
            "url": "https://images.unsplash.com/photo-1708388064322-c15cca1f86a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VGV4YXMlMjBHcmlsbHxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            "business_id": 6,
            "url": "https://images.unsplash.com/photo-1708388464516-b52bfefde2b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGV4YXMlMjBHcmlsbHxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            "business_id": 6,
            "url": "https://images.unsplash.com/photo-1708388062565-fc08ef6e4c0f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 6,
            "url": "https://images.unsplash.com/photo-1708388466735-7cca71c7cc6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFRleGFzJTIwR3JpbGx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "business_id": 7,
            "url": "https://images.unsplash.com/photo-1579783411194-f697db862dcd?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 7,
            "url": "https://plus.unsplash.com/premium_photo-1668146916315-be3f5417f5ee?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 7,
            "url": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 7,
            "url": "https://plus.unsplash.com/premium_photo-1668146930385-c1078da0fb35?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 8,
            "url": "https://images.unsplash.com/photo-1579236546973-39f510ef2a37?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 8,
            "url": "https://images.unsplash.com/photo-1594851001301-de3cb3c8ca6c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 8,
            "url": "https://images.unsplash.com/photo-1555992457-b8fefdd09069?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 8,
            "url": "https://images.unsplash.com/photo-1501688190156-9e816757373a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

        {
            "business_id": 9,
            "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 9,
            "url": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 9,
            "url": "https://img.freepik.com/premium-photo/small-cafe-with-large-window-that-says-coffee-it_902338-12111.jpg"
        },
        {
            "business_id": 9,
            "url": "https://media-cdn.tripadvisor.com/media/photo-s/0f/4b/23/6f/small-cafe.jpg"
        },
        {
            "business_id": 10,
            "url": "https://cdn.vox-cdn.com/thumbor/tTf--qzZSDhcfD7-gteoMM4cVM0=/0x0:5461x3641/1170x878/filters:focal(2295x1385:3167x2257):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/71974835/Nelita_2__cred_Clayton_Vieira.0.jpeg"
        },
        {
            "business_id": 10,
            "url": "https://plus.unsplash.com/premium_photo-1664297857915-bf33840950d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXVzdGluJTIwYnJld3MlMjBjYWZlfGVufDB8fDB8fHww"
        },
        {
            "business_id": 10,
            "url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 10,
            "url": "https://images.unsplash.com/photo-1519942982630-5c3c73b25583?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVzdGluJTIwYnJld3MlMjBjYWZlfGVufDB8fDB8fHww"
        },
        {
            "business_id": 11,
            "url": "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 11,
            "url": "https://images.unsplash.com/photo-1564327368633-151ef1d45021?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 11,
            "url": "https://images.unsplash.com/photo-1564327367919-cb377ea6a88f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 11,
            "url": "https://images.unsplash.com/photo-1621947529620-2b9fdbd5beae?q=80&w=2707&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 12,
            "url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 12,
            "url": "https://images.unsplash.com/photo-1510877073473-6d4545e9c2af?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 12,
            "url": "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 12,
            "url": "https://images.unsplash.com/photo-1574919369977-5ecb109b5a74?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

        {
            "business_id": 13,
            "url": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 13,
            "url": "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 13,
            "url": "https://images.unsplash.com/photo-1478122251258-df9e3b3b3e12?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 13,
            "url": "https://images.unsplash.com/photo-1601599561213-832382fd07ba?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 14,
            "url": "https://media.gettyimages.com/id/993367404/photo/market-stall.jpg?s=612x612&w=0&k=20&c=vKHmiNo_Nc4ijtg0eRiBV6jmr57VaOfrVjY30HIIKOs="
        },
        {
            "business_id": 14,
            "url": "https://media.gettyimages.com/id/530048686/photo/handmade-bamboo-ware-at-shop-in-narita-japan.jpg?s=612x612&w=0&k=20&c=EwedQCsC6ILJ88qOfC27xp54MIwOpEOB15Tgpp2CBgY="
        },
        {
            "business_id": 14,
            "url": "https://media.gettyimages.com/id/1268426214/photo/supermarket-open-for-business.jpg?s=612x612&w=0&k=20&c=P3uDlcgnSg8xXwVM9qN2nS-ZFMK7IZy3oOtLtSDrIRM="
        },
        {
            "business_id": 14,
            "url": "https://media.istockphoto.com/id/1165874906/photo/a-variety-of-flowers-on-a-street-exhibition-flower-shop-bologna-italy.webp?b=1&s=170667a&w=0&k=20&c=YY5Ke9oZc47wRSGv2N_Ny8mtV3kpVphCwz92PJN6N0M="
        },
        {
            "business_id": 15,
            "url": "https://images.unsplash.com/photo-1526399743290-f73cb4022f48?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 15,
            "url": "https://images.unsplash.com/photo-1554486855-60050042cd53?q=80&w=2736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 15,
            "url": "https://images.unsplash.com/photo-1588421024623-940056140e58?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 15,
            "url": "https://images.unsplash.com/photo-1689751935647-8243f57c0669?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 16,
            "url": "https://images.unsplash.com/photo-1611279522012-6c3e2d2c604f?q=80&w=2821&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 16,
            "url": "https://images.unsplash.com/photo-1632175771754-4c413217669f?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 16,
            "url": "https://images.unsplash.com/photo-1604200657090-ae45994b2451?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "business_id": 16,
            "url": "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ]

    create_business_images = [BusinessImage(**business_image) for business_image in all_business_images]
    add_business_images = [db.session.add(business_image) for business_image in create_business_images]
    db.session.commit()
    return create_business_images


def undo_business_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business_images"))
        
    db.session.commit()