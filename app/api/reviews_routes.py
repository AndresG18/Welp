from flask import Blueprint , request
from flask_login import login_required, current_user
from ..forms import BusinessForm,BusinessImageForm,ReviewForm
from ..models import db,Business,BusinessImage,Review

reviews_routes = Blueprint('review', __name__)

def authorize(owner_id):
    if owner_id != current_user.id: return {"message":"Forbidden"}, 403
    return None

@reviews_routes.route('/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get(review_id)
    if not review: return {"message": "Review not found"}, 404
    return review.to_dict

@reviews_routes.route('/current')
@login_required
def get_current_reviews():
    user_id = current_user.id
    reviews = Review.query.filter_by(user_id=user_id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

@reviews_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review(review_id):
    review = Review.query.get(review_id)
    if not review: return {"message": "Review not found"}, 404

    is_auth = authorize(review.user_id)
    if is_auth: return is_auth

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.review = form.data['review']
        review.star_rating = form.data['star_rating']
        db.session.commit()
        return review.to_dict(), 200
    else:
        return {"errors": form.errors}, 400
    
@reviews_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return {"message": "Review not found"}, 404

    is_auth = authorize(review.user_id)
    if is_auth:return is_auth

    db.session.delete(review)
    db.session.commit()
    return {"message": "Successfully deleted"}, 200