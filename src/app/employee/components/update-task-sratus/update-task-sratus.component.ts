import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';

interface UpdateTaskPayload {
  currentStatus: number;
}
@Component({
  selector: 'app-update-task-sratus',
  templateUrl: './update-task-sratus.component.html',
  styleUrls: ['./update-task-sratus.component.scss']
})
export class UpdateTaskSratusComponent implements OnInit {

  
  updateTaskForm: FormGroup;
  successMessage: string;
  errorMessage: string;

  // Define the status options
  statusOptions = [
    { name: 'Pending', value: 1 },
    { name: 'In Progress', value: 2 },
    { name: 'Completed', value: 3 }
  ];

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService
  ) {
    // Initialize the form with validation
    this.updateTaskForm = this.fb.group({
      taskID: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Task ID should be a positive integer
      currentStatus: [null, [Validators.required]] // Status should be selected from options
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.updateTaskForm.valid) {
      const taskID = this.updateTaskForm.value.taskID;
      const updatedTask: UpdateTaskPayload = {
        currentStatus: this.updateTaskForm.value.currentStatus // Directly use the number
      };

      this.tasksService.updateTaskStatus(taskID, updatedTask).subscribe(
        response => {
          this.successMessage = 'Task status updated successfully!';
          this.errorMessage = ''; // Clear any previous error message
        },
        error => {
          this.errorMessage = 'Failed to update task status. Please try again.';
          this.successMessage = ''; // Clear any previous success message
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}



