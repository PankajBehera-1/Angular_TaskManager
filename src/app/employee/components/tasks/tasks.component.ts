import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { LoginService } from 'src/app/services/login.service'; // Import the LoginService

interface Task {
  taskID: number;
  taskName: string;
  description: string;
  createdBy: string;
  createdOn: string;
  assignedTo: string;
  projectID: number;
  taskPriorityID: number;
  currentStatus: number;
  currentTaskStatusID: number;
  lastUpdatedOn: number;
}

interface GroupedTask {
  taskStatusName: string;
  tasks: Task[];
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  taskGroups: GroupedTask[] = []; // Initialize as an empty array

  constructor(
    private tasksService: TasksService,
    private loginService: LoginService // Inject the LoginService
  ) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(
      (response: any) => {
        this.taskGroups = this.groupTasksByStatus(response);
      },
      error => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  private groupTasksByStatus(tasks: Task[]): GroupedTask[] {
    const grouped: { [key: number]: GroupedTask } = {};

    tasks.forEach(task => {
      if (!grouped[task.currentStatus]) {
        grouped[task.currentStatus] = {
          taskStatusName: this.getStatusName(task.currentStatus),
          tasks: []
        };
      }
      grouped[task.currentStatus].tasks.push(task);
    });

    return Object.values(grouped);
  }

  private getStatusName(statusId: number): string {
    // Map statusId to status name; adjust according to your status mapping
    const statusNames: { [key: number]: string } = {
      1: 'Pending',
      2: 'In Progress',
      3: 'Completed'
    };
    return statusNames[statusId] || 'Unknown';
  }
}
