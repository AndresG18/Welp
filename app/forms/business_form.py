from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError,Length

class BusinessForm(FlaskForm):
    category_id = IntegerField('Category_id', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired(),Length(min= 0 ,max= 30)])
    address = StringField('Address', validators=[DataRequired(), Length(min= 0 ,max= 30)])
    city = StringField('City', validators=[DataRequired(), Length(min= 0 ,max= 20)])
    state = StringField('State', validators=[DataRequired(), Length(min= 0 ,max= 20)])
    hours = StringField('Hours', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired(), Length(min= 0 ,max= 200)])
    price = SelectField('Price', choices=[("Low", "Medium", "High")], validators=[DataRequired()])
    preview_image = StringField('Preview_image', validators=[DataRequired()])
