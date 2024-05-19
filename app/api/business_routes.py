from flask import Blueprint , request
from flask_login import login_required, current_user
from ..forms import BusinessForm,BusinessImageForm,ReviewForm
from ..models import db,Business,BusinessImage,Review

business_routes = Blueprint('business', __name__)

def authorize(owner_id):
    if owner_id != current_user.id: return {"message":"Forbidden"}, 403
    return None

@business_routes.route('/')
def get_all():
    bizs = Business.query.all()
    return {'businesses': [bus.to_dict() for bus in bizs]}

@business_routes.route('/current')
@login_required
def get_current():
    user_id = current_user.id
    bizs = Business.query.filter_by(owner_id = user_id).all()
    return {'businesses': [biz.to_dict() for biz in bizs]}

@business_routes.route('/<int:bus_id>')
def get_by_id(bus_id):
    biz = Business.query.get(bus_id)
    if biz: return {'business': biz.to_dict()}
    else : return {"message": "Business not found"}, 404


@business_routes.route('/new', methods=['POST'])
@login_required
def create():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_biz = Business(
            owner_id = current_user.id,
            category_id = form.data['category_id'],
            name = form.data['name'],
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            hours = form.data['hours'],
            description = form.data['description'],
            preview_image = form.data['preview_image']
        )
        db.session.add(new_biz) 
        db.session.commit()
        return new_biz.to_dict(), 201
    else : 
        return {"errors":form.errors}, 400
    
    
@business_routes.route('/<int:bus_id>', methods=['PUT'])
@login_required
def edit(bus_id):
    biz = Business.query.get(bus_id)
    if not biz: return {"message": "Business not found"}, 404
    
    is_auth = authorize(biz.owner_id)
    if is_auth : return is_auth
    
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        biz.category_id = form.data['category_id']
        biz.name = form.data['name']
        biz.address = form.data['address']
        biz.city = form.data['city']
        biz.state = form.data['state']
        biz.hours = form.data['hours']
        biz.description = form.data['description']
        biz.preview_image = form.data['preview_image']
        db.session.commit()
        return biz.to_dict(), 200
    else:
        return {"errors": form.errors}, 400
    
@business_routes.route('/<int:bus_id>', methods=['DELETE'])
@login_required
def delete(bus_id):
    biz = Business.query.get(bus_id)
    if not biz: return {"message": "Business not found"}, 404
    
    is_auth = authorize(biz.owner_id)
    if is_auth  : return is_auth
    
    db.session.delete(biz)
    db.session.commit()
    return {"message": "Successfully deleted"}, 200
    
@business_routes.route('/<int:bus_id>/images')
@login_required
def get_images(bus_id):
    biz_imgs = BusinessImage.query.filter_by(business_id=bus_id).all()
    return {'BusinessImages':[img.to_dict() for img in biz_imgs]}

@business_routes.route('/<int:bus_id>/images/new',methods=["POST"])
@login_required
def create_image(bus_id):
    biz = Business.query.get(bus_id)
    
    is_auth = authorize(biz.owner_id)
    if is_auth : return is_auth
    form = BusinessImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_img = BusinessImage(
            business_id = bus_id,
            url = form.data['url']
        )
        db.session.add(new_img)
        db.session.commit()
        return new_img.to_dict()
    else:
        return {"errors": form.errors}, 400
    
@business_routes.route('/<int:bus_id>/reviews')
def get_reviews(bus_id):
    biz = Business.query.get(bus_id)
    if not biz: return {"message": "Business not found"}, 404
    reviews = Review.query.filter_by(business_id=bus_id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

@business_routes.route('<int:bus_id>/reviews/new', methods=['POST'])
@login_required
def create_review(bus_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = Business.query.get(bus_id)
        if not business: return {"message": "Business not found"}, 404
        new_review = Review(
            user_id = current_user.id,
            business_id = bus_id,
            review = form.data['review'],
            star_rating = form.data['star_rating']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    else:
        return {"errors": form.errors}, 400
    


