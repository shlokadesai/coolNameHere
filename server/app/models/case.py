from app import db
from flask import current_app

"""
class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, index=True)
    cases = db.relationship('Case', backref='category', lazy='dynamic')
"""

class Case(db.Model):
    __tablename__ = "cases"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Boolean, index=True)
    #categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.Column(db.String(64), index=True)
