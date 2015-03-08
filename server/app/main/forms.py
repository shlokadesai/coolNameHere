from flask.ext.wtf import Form
from wtforms import StringField, SubmitField, SelectField, DateTimeField, DateField, TextAreaField, FileField,BooleanField,SelectMultipleField
from wtforms.validators import Required


class NameForm(Form):
    name = StringField('What is your name?', validators=[Required()])
    submit = SubmitField('Submit')

class VictimForm(Form):
    category = SelectField("Category:", validators=[Required()], choices=[
        ("Sexual Assault","Sexual Assault"),
        ("Rape","Rape"),
        ("Domestic Violence","Domestic Violence")])
    date = DateField('Date of (latest) offense', format='%Y-%m-%d')
    location = StringField('Address')
    city = StringField('City')
    country = StringField('Country')
    offender = StringField('Offender Name(s)')
    relationship = StringField('Relationship to offender')
    description = TextAreaField('Detailed description')
    needs = SelectMultipleField("How can we help?", choices=[
        ("Counselling","Counselling"),
        ("Financial","Financial help"),
        ("Legal advice","Legal advice"),
        ("Take me to safety", "Take me somewhere safe")
        ])
    attachment = FileField('Evidence (optional)')
    email = StringField('Email')
    phone = StringField('Phone Number')
    pickedUpLocation = StringField('Where and when would you like us to come and get you?')
    submit = SubmitField('Report')

class WitnessForm(Form):
    category = SelectField("Category:", validators=[Required()], choices=[
        ("Sexual Assault","Sexual Assault"),
        ("Rape","Rape"),
        ("Domestic Violence","Domestic Violence")])
    date = DateField('Date of (latest) offense', format='%Y-%m-%d')
    location = StringField('Address')
    city = StringField('City')
    country = StringField('Country')
    relationship = StringField('Relationship to victim')
    description = TextAreaField('Detailed description')
    attachment = FileField('Evidence (optional)')
    email = StringField('Email')
    phone = StringField('Phone Number')
    submit = SubmitField('Report')

class OrgnizationForm(Form):
    name = StringField("Name")
    location = StringField("Address")
    city = StringField('City')
    country = StringField('Country')
    email = StringField('Email')
    type = SelectMultipleField("How would you like to help?", choices=[
        ("Counselling","Counselling"),
        ("Financial","Financial help"),
        ("Legal advice","Legal advice"),
        ("safehouse", "Provide Safehouse for victims")
        ])
    auth = StringField("How long have you been in operation for?")


