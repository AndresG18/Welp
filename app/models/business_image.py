from .db import db, environment, SCHEMA

class BusinessImage(db.Model):
    __tablename__ = 'business_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    url = db.Column(db.String, nullable=False)
    
    business = db.relationship('Business', back_populates='images')
    
    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'url': self.url
        }