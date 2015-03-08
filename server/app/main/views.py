from flask import render_template, session, redirect, url_for, current_app, abort, send_from_directory
from ..email import send_email
from . import main
from .forms import NameForm, VictimForm, OrganizationForm
from .. import flash
from flask.ext.babel import gettext as _
from app.models.user import User
from flask.ext.sqlalchemy import get_debug_queries

@main.after_app_request
def after_request(response):
    for query in get_debug_queries():
        if query.duration >= current_app.config['SLOW_DB_QUERY_TIME']:
            current_app.logger.warning('Slow query: %s\nParameters: %s\nDuration: %f sec\nContext: %s\n' %
                (query.statement, query.parameters, query.duration, query.context))
    return response


@main.route('/')
def index():
    return render_template('index.html', name=session.get('name'))

@main.route('/index2', methods=['GET', 'POST'])
def index2():
    return render_template('index2.html', name=session.get('name'))

@main.route('/static/data/<filename>', methods=['GET', 'POST'])
def readData(filename):
    return current_app.send_static_file('data/' + filename)

	
@main.route('/gethelp', methods=['GET', 'POST'])
def gethelp():
    return render_template('getHelp.html', name=session.get('name'), victimForm=VictimForm())

@main.route('/signup', methods=['GET', 'POST'])
def signup():
    return render_template('signup.html', name=session.get('name'), OrganizationForm=OrganizationForm())

@main.route('/user/<username>')
def user(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        abort(404)

    return render_template('user.html', user=user)

@main.route('/report/')
def report():
    return "report"

