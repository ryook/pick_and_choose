# codig:utf-8

import json
import os

from flask import Flask, render_template, request, abort
from pymongo import MongoClient


app = Flask(__name__)
app.debug = True

MONGO_URL = os.environ.get('MONGODB_URI')

if MONGO_URL:
    # Get a connection
    connection = MongoClient(MONGO_URL)
    # Get the database
    db = connection.heroku_r2gp668m
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


@app.route('/admin/research', methods=['GET'])
def get_admin_reaserches():
    db_datas = db.researches.find()
    datas = []
    for d in db_datas:
        object_id = d.pop('_id')
        answers = db.answers.find({'searchId': str(d['id'])})
        d['count'] = len([a for a in answers])
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
    data['limit'] = obj.get('limit')
    data['question'] = obj.get('question')
    data['FA'] = obj.get('FA')
    data['FATitle'] = obj.get('FATitle')
    questions = obj.getlist('questions')
    add_questions = []
    for question in questions:
        question = json.loads(question)
        title = question['title']
        if title == '':
            continue
        obj = {}
        obj['title'] = title
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


@app.route('/analytics', methods=['GET', 'POST'])
def get_analytics_info():
    _id = request.args.get('id')
    answers = db.answers.find({'searchId': _id})
    image_answer = [d['selected'] for d in answers]
    info = {}
    info['count'] = len(image_answer)
    info['images'] = count_yes(image_answer)
    return json.dumps(info)


@app.route('/analytics_selected', methods=['GET', 'POST'])
def get_analytics_selected():
    _id = request.args.get('researchId')
    choices = request.args.getlist('choices')

    choices = [json.loads(c) for c in choices]
    answers = db.answers.find({'searchId': _id})
    if choices == []:
        image_answer = [d['selected'] for d in answers]
        info = {}
        info['count'] = len(image_answer)
        info['images'] = count_yes(image_answer)
        return json.dumps(info)

    choices_questions = set([c['q'] for c in choices])
    for cq in choices_questions:
        choicing = [c['c'] for c in choices if c['q'] == cq]
        if cq == 'sex':
            key = 'sex'
        else:
            key = 'q' + str(cq)
        new_answers = []
        for a in answers:
            try:
                if a[key] in choicing:
                    new_answers.append(a)
            except:
                print(a)
        answers = new_answers
        # answers = [a for a in answers if a[key] in choicing]
    image_answer = [d['selected'] for d in new_answers]
    if image_answer:
        info = {}
        info['count'] = len(image_answer)
        info['images'] = count_yes(image_answer)
        return json.dumps(info)
    else:
        return 'None'



def count_yes(data):
    rtn = []
    if data == []:
        return None
    image_count = len(data[0])
    for i in range(image_count):
        i_image_yes_count = [d[i] for d in data].count('1')
        rtn.append({'id': i + 1, 'count': i_image_yes_count})
    return rtn


if __name__ == "__main__":
    MONGO_URI = os.environ.get('MONGODB_URI')
    if MONGO_URI:
        run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    else:
        app.run(host='localhost')
    app.run()
