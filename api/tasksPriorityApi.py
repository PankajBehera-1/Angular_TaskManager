from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

task_priorities = [
    {'taskPriorityId': 1, 'taskPriorityName': 'Important'},
    {'taskPriorityId': 2, 'taskPriorityName': 'High'},
    {'taskPriorityId': 3, 'taskPriorityName': 'Medium'},
    {'taskPriorityId': 4, 'taskPriorityName': 'Low'}
]

@app.route('/task_priorities', methods=['GET'])
def get_task_priorities():
    return jsonify(task_priorities), 200

@app.route('/task_priorities/<int:task_priority_id>', methods=['GET'])
def get_task_priority(task_priority_id):
    task_priority = next((tp for tp in task_priorities if tp['taskPriorityId'] == task_priority_id), None)
    if task_priority is None:
        return jsonify({'error': 'Task Priority not found'}), 404
    return jsonify(task_priority), 200

@app.route('/task_priorities', methods=['POST'])
def create_task_priority():
    data = request.json
    if not data or 'taskPriorityId' not in data or 'taskPriorityName' not in data:
        return jsonify({'error': 'Bad Request'}), 400
    
    new_task_priority = {
        'taskPriorityId': data['taskPriorityId'],
        'taskPriorityName': data['taskPriorityName']
    }
    task_priorities.append(new_task_priority)
    return jsonify(new_task_priority), 201

@app.route('/task_priorities/<int:task_priority_id>', methods=['PUT'])
def update_task_priority(task_priority_id):
    data = request.json
    if not data or 'taskPriorityName' not in data:
        return jsonify({'error': 'Bad Request'}), 400
    
    task_priority = next((tp for tp in task_priorities if tp['taskPriorityId'] == task_priority_id), None)
    if task_priority is None:
        return jsonify({'error': 'Task Priority not found'}), 404
    
    task_priority['taskPriorityName'] = data['taskPriorityName']
    return jsonify(task_priority), 200

@app.route('/task_priorities/<int:task_priority_id>', methods=['DELETE'])
def delete_task_priority(task_priority_id):
    global task_priorities
    task_priorities = [tp for tp in task_priorities if tp['taskPriorityId'] != task_priority_id]
    return jsonify({'message': 'Task Priority deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True,port=5008)
