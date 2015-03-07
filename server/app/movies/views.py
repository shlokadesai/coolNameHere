from flask import render_template
from . import movies

@movies.route('/', methods=['GET'])
def index():
    return render_template('movies.html')
