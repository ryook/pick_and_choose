# codig:utf-8
import json

import sqlite3
import os

from flask import Flask, render_template, request, abort
from pymongo import MongoClient


app = Flask(__name__)
app.debug = True

MONGO_URL = os.environ.get('MONGOLAB_URI')

if MONGO_URL:
    # Get a connection
    connection = MongoClient(MONGO_URL)
    # Get the database
    db = connection.heroku_8kvm200l
else:
    # Not on an app with the MongoHQ add-on, do some localhost action
    connection = MongoClient('localhost', 27017)
    db = connection.pac


@app.route('/')
def main():
    return app.send_static_file('index.html')


@app.route('/research', methods=['GET'])
def get_reaserches():
    db_datas = db.researches.find()
    datas = []
    for d in db_datas:
        object_id = d.pop('_id')
        datas.append(d)
    return json.dumps(datas)


@app.route('/research/<int:id>', methods=['GET', 'POST'])
def get_reaserch(id):
    if request.method == 'POST':
        data = parse_research_request(request.args)
        if id == 0:
            all_data = [d for d in db.researches.find()]
            new_id = len(all_data) + 1
            data['id'] = new_id
            db.researches.save(data)
            return "success"
        data['id'] = id
        # dbに存在するか確認
        db_data = db.researches.find_one({'id': id})
        if db_data:
            db.researches.update_one({'id': id}, {'$set': data})
        else:
            db.researches.save(data)
        return "success"
    else:
        data = db.researches.find_one({'id': id})
        object_id = data.pop('_id')
        return json.dumps(data)


@app.route('/answers', methods=['POST'])
def save_answer():
    data = parse_answer_request(request.args)
    db.answers.save(data)
    return "success"


def parse_research_request(obj):
    if obj is None:
        abort(404)
    data = {}
    data['title'] = obj.get('title')
    data['description'] = obj.get('description')
    data['image_path'] = obj.get('imageUrl')
    data['imageCount'] = obj.get('imageCount')
    data['question'] = obj.get('question')
    questions = obj.getlist('questions')
    print(questions)
    add_questions = []
    for question in questions:
        question = json.loads(question)
        obj = {}
        obj['title'] = question['title']
        obj['choices'] = question['choices'].split('\n')
        add_questions.append(obj)
    data['questions'] = add_questions
    return data


def parse_answer_request(obj):
    keys = obj.keys()
    data = {}
    for key in keys:
        data[key] = obj.get(key)
        if key == 'selected':
            selected = obj.getlist(key)
            data[key] = selected
    return data


if __name__ == "__main__":
    MONGO_URI = os.environ.get('MONGOLAB_URI')
    if MONGO_URI:
          run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    else:
          app.run(host='localhost')
    app.run()
