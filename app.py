import json

import sqlite3
import os

from flask import Flask, render_template, request, abort
from pymongo import MongoClient
# from models.models import Content
# from models.database import db_session


app = Flask(__name__)
app.debug = True

MONGO_URL = os.environ.get('MONGOLAB_URI')

if MONGO_URL:
    # Get a connection
    connection = MongoClient(MONGO_URL)
    # Get the database
    db = connection.heroku_vdhmc6fz
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


# @app.route('/end')
# def end():
#     return render_template('end.html')
#
#
# @app.route('/result', methods=['GET'])
# def result():
#     contents = list(db.entries.find())
#     results = culcu_result(contents)
#     print(results)
#     return json.dumps(results)
#
#
# def show_form():
#     return render_template('form.html')
#
#
def parse_research_request(obj):
    if obj is None:
        abort(404)
    data = {}
    data['title'] = obj.get('title')
    data['description'] = obj.get('description')
    data['image_path'] = obj.get('imageUrl')
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

#
# def culcu_result(contents):
#     results = []
#     for n in range(1, 10):
#         row_result = [parse(i) for i in contents if i['teacher'] == str(n)]
#         result = persent(row_result, n)
#         results.append(result)
#     desc_result = sorted(results, key=lambda x: x['all_cnt'], reverse=True)
#     return desc_result
#
# def persent(result, n):
#     dic = {}
#     dic['teacher'] = n
#     dic['all_cnt'] = len(result)
#     dic['s0'] = len([r for r in result if r['sex']=='0'])
#     dic['s1'] = len([r for r in result if r['sex']=='1'])
#     dic['f0'] = len([r for r in result if r['faculty']=='0'])
#     dic['f1'] = len([r for r in result if r['faculty']=='1'])
#     dic['u0'] = len([r for r in result if r['user_type']=='0'])
#     dic['u1'] = len([r for r in result if r['user_type']=='1'])
#     return dic
#
# def parse(content):
#     obj = {}
#     obj['sex'] = content['sex']
#     obj['user_type'] = content['user_type']
#     obj['faculty'] = content['faculty']
#     obj['teacher'] = content['teacher']
#     return obj



if __name__ == "__main__":
    # MONGO_URI = os.environ.get('MONGOLAB_URI')
    # if MONGO_URI:
    #       run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    # else:
    #       app.run(host='localhost')
    app.run()
