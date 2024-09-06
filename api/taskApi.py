from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory storage for tasks
tasks = {}
task_id_counter = 1

class Task:
    def __init__(self, taskID, taskName, description, createdOn, projectID, createdBy, assignedTo, taskPriorityID, lastUpdatedOn, currentStatus, currentTaskStatusID):
        self.taskID = taskID
        self.taskName = taskName
        self.description = description
        self.createdOn = createdOn
        self.projectID = projectID
        self.createdBy = createdBy
        self.assignedTo = assignedTo
        self.taskPriorityID = taskPriorityID
        self.lastUpdatedOn = lastUpdatedOn
        self.currentStatus = currentStatus
        self.currentTaskStatusID = currentTaskStatusID

    def to_dict(self):
        return {
            'taskID': self.taskID,
            'taskName': self.taskName,
            'description': self.description,
            'createdOn': self.createdOn,
            'projectID': self.projectID,
            'createdBy': self.createdBy,
            'assignedTo': self.assignedTo,
            'taskPriorityID': self.taskPriorityID,
            'lastUpdatedOn': self.lastUpdatedOn,
            'currentStatus': self.currentStatus,
            'currentTaskStatusID': self.currentTaskStatusID
        }

def add_sample_data():
    global task_id_counter
    sample_tasks = [
        {
            'taskName': 'Design Database Schema',
            'description': 'Create a detailed design of the database schema.',
            'createdOn': '2024-08-01',
            'projectID': 1,
            'createdBy': 'John Doe',
            'assignedTo': 'Jane Smith',
            'taskPriorityID': 1,
            'lastUpdatedOn': 1693485600,
            'currentStatus': 1,
            'currentTaskStatusID': 1
        },
        {
            'taskName': 'Develop API Endpoints',
            'description': 'Implement all necessary API endpoints for the application.',
            'createdOn': '2024-08-02',
            'projectID': 1,
            'createdBy': 'Alice Johnson',
            'assignedTo': 'Bob Brown',
            'taskPriorityID': 2,
            'lastUpdatedOn': 1693572000,
            'currentStatus': 2,
            'currentTaskStatusID': 2
        },
        {
            'taskName': 'Write Unit Tests',
            'description': 'Write unit tests for all API endpoints.',
            'createdOn': '2024-08-03',
            'projectID': 2,
            'createdBy': 'Carol White',
            'assignedTo': 'Dave Wilson',
            'taskPriorityID': 3,
            'lastUpdatedOn': 1693658400,
            'currentStatus': 3,
            'currentTaskStatusID': 3
        },
        {
            'taskName': 'Set Up CI/CD Pipeline',
            'description': 'Configure continuous integration and delivery pipeline.',
            'createdOn': '2024-08-04',
            'projectID': 2,
            'createdBy': 'Eve Black',
            'assignedTo': 'Frank Green',
            'taskPriorityID': 1,
            'lastUpdatedOn': 1693744800,
            'currentStatus': 1,
            'currentTaskStatusID': 1
        },
        {
            'taskName': 'Deploy Application',
            'description': 'Deploy the application to production server.',
            'createdOn': '2024-08-05',
            'projectID': 3,
            'createdBy': 'Grace Blue',
            'assignedTo': 'Henry Red',
            'taskPriorityID': 2,
            'lastUpdatedOn': 1693831200,
            'currentStatus': 2,
            'currentTaskStatusID': 2
        }
    ]

    for task_data in sample_tasks:
        global task_id_counter
        task = Task(
            taskID=task_id_counter,
            taskName=task_data['taskName'],
            description=task_data['description'],
            createdOn=task_data['createdOn'],
            projectID=task_data['projectID'],
            createdBy=task_data['createdBy'],
            assignedTo=task_data['assignedTo'],
            taskPriorityID=task_data['taskPriorityID'],
            lastUpdatedOn=task_data['lastUpdatedOn'],
            currentStatus=task_data['currentStatus'],
            currentTaskStatusID=task_data['currentTaskStatusID']
        )
        tasks[task_id_counter] = task
        task_id_counter += 1

add_sample_data()

@app.route('/tasks', methods=['GET'])
def get_tasks():
    try:
        return jsonify([task.to_dict() for task in tasks.values()])
    except Exception as e:
        print(f"Error fetching tasks: {e}")
        return jsonify({'error': 'Failed to fetch tasks'}), 500

@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    try:
        task = tasks.get(task_id)
        if not task:
            return jsonify({'error': 'Task not found'}), 404
        return jsonify(task.to_dict())
    except Exception as e:
        print(f"Error fetching task {task_id}: {e}")
        return jsonify({'error': 'Failed to fetch task'}), 500

@app.route('/tasks', methods=['POST'])
def create_task():
    global task_id_counter
    try:
        data = request.json
        task = Task(
            taskID=task_id_counter,
            taskName=data['taskName'],
            description=data['description'],
            createdOn=data['createdOn'],
            projectID=data['projectID'],
            createdBy=data['createdBy'],
            assignedTo=data['assignedTo'],
            taskPriorityID=data['taskPriorityID'],
            lastUpdatedOn=data['lastUpdatedOn'],
            currentStatus=data['currentStatus'],
            currentTaskStatusID=data['currentTaskStatusID']
        )
        tasks[task_id_counter] = task
        task_id_counter += 1
        return jsonify(task.to_dict()), 201
    except Exception as e:
        print(f"Error creating task: {e}")
        return jsonify({'error': 'Failed to create task'}), 500

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    try:
        data = request.json
        task = tasks.get(task_id)
        if not task:
            return jsonify({'error': 'Task not found'}), 404
        
        task.taskName = data.get('taskName', task.taskName)
        task.description = data.get('description', task.description)
        task.createdOn = data.get('createdOn', task.createdOn)
        task.projectID = data.get('projectID', task.projectID)
        task.createdBy = data.get('createdBy', task.createdBy)
        task.assignedTo = data.get('assignedTo', task.assignedTo)
        task.taskPriorityID = data.get('taskPriorityID', task.taskPriorityID)
        task.lastUpdatedOn = data.get('lastUpdatedOn', task.lastUpdatedOn)
        task.currentStatus = data.get('currentStatus', task.currentStatus)
        task.currentTaskStatusID = data.get('currentTaskStatusID', task.currentTaskStatusID)
        
        return jsonify(task.to_dict())
    except Exception as e:
        print(f"Error updating task {task_id}: {e}")
        return jsonify({'error': 'Failed to update task'}), 500

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        if task_id in tasks:
            del tasks[task_id]
            return jsonify({'message': 'Task deleted'}), 200
        else:
            return jsonify({'error': 'Task not found'}), 404
    except Exception as e:
        print(f"Error deleting task {task_id}: {e}")
        return jsonify({'error': 'Failed to delete task'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5010)
