from .db import db, environment, SCHEMA

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    review = db.Column(db.String(200), nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)
    
    user = db.relationship('Users', back_populates='review')
    business = db.relationship('Business',back_populates='reviews')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'review': self.review,
            'star_rating':self.star_rating
        }
    