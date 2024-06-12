from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SelectField,FloatField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange

class BusinessForm(FlaskForm):
    category_id = IntegerField('Category_id', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired(),Length(min= 0 ,max= 30)])
    address = StringField('Address', validators=[DataRequired(), Length(min= 0 ,max= 30)])
    city = StringField('City', validators=[DataRequired(), Length(min= 0 ,max= 20)])
    state = StringField('State', validators=[DataRequired(), Length(min= 0 ,max= 20)])
    description = StringField('Description', validators=[DataRequired(), Length(min= 0 ,max= 200)])
    preview_image = StringField('Preview_image', validators=[DataRequired()])
    price = StringField('Price', validators=[DataRequired()])
    latitude = FloatField('Latitude', validators=[DataRequired(), NumberRange(min=-90, max=90, message="Latitude must be between -90 and 90")])
    longitude = FloatField('Longitude', validators=[DataRequired(), NumberRange(min=-180, max=180, message="Longitude must be between -180 and 180")])
    days_open = StringField('Days of Week Open', validators=[DataRequired()])
    hours = StringField('Hours', validators=[DataRequired()])