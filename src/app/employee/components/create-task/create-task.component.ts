import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { TaskPriorities } from 'src/app/models/task-priorities';
import { LoginService } from 'src/app/services/login.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TaskPriorityService } from 'src/app/services/task-priority.service';
import { TasksService } from 'src/app/services/tasks.service';

interface Employee {
  id: number;
  userName: string;
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  newTaskForm: FormGroup;
  projects: Observable<Project[]>;
  employees: Employee[] = []; // Ensure this matches the data type
  taskPriorities: Observable<TaskPriorities[]>;

  constructor(
    private taskService: TasksService,
    private router: Router,
    private projectService: ProjectsService,
    private taskPriorityService: TaskPriorityService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.newTaskForm = new FormGroup({
      taskID: new FormControl(0),
      taskName: new FormControl(null, [Validators.required]),
      description: new FormControl(null, []),
      projectID: new FormControl(null, [Validators.required]),
      assignedTo: new FormControl(null, [Validators.required]),
      taskPriorityID: new FormControl(null, [Validators.required]),
      taskStatus: new FormControl('Holding', [Validators.required]) // Default value set here
    });

    this.loginService.getAllEmployees().subscribe(
      data => {
        this.employees = data.usernames.map((username: string, index: number) => ({
          id: index + 1,   // or some unique ID if available
          userName: username
        }));
      },
      error => {
        console.error('Error fetching usernames:', error);
      }
    );

    this.projects = this.projectService.getAllProjects();
    this.taskPriorities = this.taskPriorityService.getTaskPriorities();
  }

  onCreateTaskClick(event: any): void {
    if (this.newTaskForm.valid) {
      this.taskService.insertTask(this.newTaskForm.value).subscribe(
        () => {
          this.router.navigate(['/Employee', 'tasks']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log(this.newTaskForm.errors);
    }
  }
}
