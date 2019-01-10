import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['DEBUG'] = True

# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bob_ross.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

Base = automap_base()
Base.prepare(db.engine, reflect=True)

episode_elements = Base.classes.elements_by_episode
episode_paintings = Base.classes.paintings_by_episode

@app.route("/element-data")
def element_data():
    stmt = db.session.query(episode_elements).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    return df.to_json()

@app.route("/painting-data")
def painting_data():
    stmt = db.session.query(episode_paintings).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    return df.to_json()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/element-correlation")
def element_correlation():
    return render_template("correlation.html")

@app.route("/timeseries")
def timeseries():
    return render_template("timeseries.html")

@app.route("/paintings")
def frames():
    return render_template("paintings.html")

if __name__ == "__main__":
    app.run()
