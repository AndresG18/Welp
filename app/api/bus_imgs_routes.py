from flask import Blueprint , request
from flask_login import login_required, current_user
from ..forms import BusinessForm,BusinessImageForm,ReviewForm
from ..models import db,Business,BusinessImage,Review

business_images_routes = Blueprint('business_images', __name__)

def authorize(owner_id):
    if owner_id != current_user.id: return {"message":"Forbidden"}, 403
    return None

@business_images_routes.route('/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(image_id):
    image = BusinessImage.query.get(image_id)
    if not image: return {"message": "Business Image not found"}, 404

    biz = Business.query.get(image.business_id)
    is_auth = authorize(biz.owner_id)
    if is_auth: return is_auth

    db.session.delete(image)
    db.session.commit()
    return {"message": "Successfully deleted"}, 200