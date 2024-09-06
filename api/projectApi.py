from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS to allow all origins
CORS(app, resources={r"/projects/*": {"origins": "*"}})

projects = [
    {'projectID': 1, 'projectName': 'Project Alpha', 'projectOfStart': '2024-01-01', 'teamSize': 15, 'clientLocationName': 'New York', 'active': True, 'clientLocationID': 101, 'status': 'In Progress'},
    {'projectID': 2, 'projectName': 'Project Beta', 'projectOfStart': '2024-03-15', 'teamSize': 28, 'clientLocationName': 'San Francisco', 'active': False, 'clientLocationID': 102, 'status': 'Completed'},
    {'projectID': 3, 'projectName': 'Project Infroan', 'projectOfStart': '2024-05-20', 'teamSize': 18, 'clientLocationName': 'Los Angeles', 'active': True, 'clientLocationID': 103, 'status': 'In Progress'},
    {'projectID': 4, 'projectName': 'Project ITSM', 'projectOfStart': '2024-06-10', 'teamSize': 22, 'clientLocationName': 'Chicago', 'active': True, 'clientLocationID': 104, 'status': 'Pending'},
    {'projectID': 5, 'projectName': 'Project YES', 'projectOfStart': '2024-07-01', 'teamSize': 11, 'clientLocationName': 'Houston', 'active': False, 'clientLocationID': 105, 'status': 'On Hold'},
    {'projectID': 6, 'projectName': 'Project Robos', 'projectOfStart': '2024-08-15', 'teamSize': 23, 'clientLocationName': 'Seattle', 'active': True, 'clientLocationID': 106, 'status': 'In Progress'},
    {'projectID': 7, 'projectName': 'Project Kekes', 'projectOfStart': '2024-09-25', 'teamSize': 27, 'clientLocationName': 'Boston', 'active': True, 'clientLocationID': 107, 'status': 'Completed'},
    {'projectID': 8, 'projectName': 'Project Delta', 'projectOfStart': '2024-10-30', 'teamSize': 19, 'clientLocationName': 'Philadelphia', 'active': False, 'clientLocationID': 108, 'status': 'Cancelled'},
    {'projectID': 9, 'projectName': 'Project Omega', 'projectOfStart': '2024-11-05', 'teamSize': 30, 'clientLocationName': 'Denver', 'active': True, 'clientLocationID': 109, 'status': 'In Progress'},
    {'projectID': 10, 'projectName': 'Project Sigma', 'projectOfStart': '2024-12-15', 'teamSize': 25, 'clientLocationName': 'San Diego', 'active': False, 'clientLocationID': 110, 'status': 'Completed'},
    {'projectID': 11, 'projectName': 'Project Epsilon', 'projectOfStart': '2024-02-28', 'teamSize': 20, 'clientLocationName': 'Atlanta', 'active': True, 'clientLocationID': 111, 'status': 'On Hold'},
    {'projectID': 12, 'projectName': 'Project Zeta', 'projectOfStart': '2024-04-10', 'teamSize': 12, 'clientLocationName': 'Dallas', 'active': True, 'clientLocationID': 112, 'status': 'In Progress'},
    {'projectID': 13, 'projectName': 'Project Theta', 'projectOfStart': '2024-06-30', 'teamSize': 17, 'clientLocationName': 'Austin', 'active': False, 'clientLocationID': 113, 'status': 'Cancelled'},
    {'projectID': 14, 'projectName': 'Project Iota', 'projectOfStart': '2024-08-22', 'teamSize': 21, 'clientLocationName': 'San Jose', 'active': True, 'clientLocationID': 114, 'status': 'Pending'},
    {'projectID': 15, 'projectName': 'Project Kappa', 'projectOfStart': '2024-09-15', 'teamSize': 29, 'clientLocationName': 'San Antonio', 'active': True, 'clientLocationID': 115, 'status': 'In Progress'}
]

@app.route('/projects', methods=['GET'])
def get_projects():
    project_id = request.args.get('projectID')
    project_name = request.args.get('projectName')
    project_start = request.args.get('projectOfStart')
    client_location_name = request.args.get('clientLocationName')
    active = request.args.get('active')
    client_location_id = request.args.get('clientLocationID')
    status = request.args.get('status')

    filtered_projects = projects

    if project_id:
        filtered_projects = [p for p in filtered_projects if p['projectID'] == int(project_id)]
    if project_name:
        filtered_projects = [p for p in filtered_projects if project_name.lower() in p['projectName'].lower()]
    if project_start:
        filtered_projects = [p for p in filtered_projects if p['projectOfStart'] == project_start]
    if client_location_name:
        filtered_projects = [p for p in filtered_projects if client_location_name.lower() in p['clientLocationName'].lower()]
    if active is not None:
        filtered_projects = [p for p in filtered_projects if p['active'] == (active.lower() == 'true')]
    if client_location_id:
        filtered_projects = [p for p in filtered_projects if p['clientLocationID'] == int(client_location_id)]
    if status:
        filtered_projects = [p for p in filtered_projects if status.lower() in p['status'].lower()]

    if filtered_projects:
        return jsonify(filtered_projects)
    else:
        return jsonify({'error': 'No projects found'}), 404

@app.route('/projects/search/<search_by>/<search_text>', methods=['GET'])
def search_projects(search_by, search_text):
    if search_by not in ['projectID', 'projectName', 'projectOfStart', 'clientLocationName', 'active', 'clientLocationID', 'status']:
        return jsonify({'error': 'Invalid search criteria'}), 400

    if search_by == 'projectID':
        search_text = int(search_text)
        filtered_projects = [p for p in projects if p['projectID'] == search_text]
    elif search_by == 'active':
        search_text = search_text.lower() == 'true'
        filtered_projects = [p for p in projects if p['active'] == search_text]
    elif search_by == 'clientLocationID':
        search_text = int(search_text)
        filtered_projects = [p for p in projects if p['clientLocationID'] == search_text]
    else:
        filtered_projects = [p for p in projects if search_text.lower() in p[search_by].lower()]

    if filtered_projects:
        return jsonify(filtered_projects)
    else:
        return jsonify({'error': 'No projects found'}), 404

@app.route('/projects', methods=['POST'])
def add_project():
    new_project = request.json
    required_fields = ['projectID', 'projectName', 'projectOfStart', 'teamSize', 'clientLocationName', 'active', 'clientLocationID', 'status']
    if not new_project or not all(field in new_project for field in required_fields):
        return jsonify({'error': 'Invalid input'}), 400

    if any(p['projectID'] == new_project['projectID'] for p in projects):
        return jsonify({'error': 'Project ID already exists'}), 400

    projects.append(new_project)
    return jsonify(new_project), 201

@app.route('/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    updated_data = request.json
    required_fields = ['projectName', 'projectOfStart', 'teamSize', 'clientLocationName', 'active', 'clientLocationID', 'status']
    if not updated_data or not all(field in updated_data for field in required_fields):
        return jsonify({'error': 'Invalid input'}), 400

    project = next((p for p in projects if p['projectID'] == project_id), None)
    if not project:
        return jsonify({'error': 'Project not found'}), 404

    project.update(updated_data)

    return jsonify(project), 200

@app.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    global projects
    projects = [p for p in projects if p['projectID'] != project_id]
    return jsonify({'message': 'Project deleted'}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5002)
