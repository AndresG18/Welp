from .db import db, environment, SCHEMA, add_prefix_for_prod

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)
    name = db.Column(db.String(30),nullable=False)
    address = db.Column(db.String(40),nullable=False)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    hours = db.Column(db.String, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    preview_image = db.Column(db.String, nullable=False)
    
    owner = db.relationship('User', back_populates='business')
    category = db.relationship('Category', back_populates='businesses')
    images = db.relationship('BusinessImage', back_populates='business', cascade="all, delete-orphan")
    reviews = db.relationship('Review',back_populates='business', cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'category_id': self.category_id,
            'name': self.name,
            'address': self.address,
            'city' : self.city,
            'state' : self.state,
            'hours' : self.hours,
            'description' : self.description,
            'preview_image' : self.preview_image
        }