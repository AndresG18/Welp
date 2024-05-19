from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,NumberRange,Length


class ReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), Length(max=200)])
    star_rating = IntegerField('Star_rating', validators=[DataRequired(), NumberRange(min=1, max=5)])