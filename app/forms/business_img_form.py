from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,Length


class BusinessImageForm(FlaskForm):
    # business_id= IntegerField('Business_id', validators=[DataRequired()])
    url = StringField("URL", validators=[DataRequired(),Length(min=5, max=1000,message="Please provide a valid URL")])