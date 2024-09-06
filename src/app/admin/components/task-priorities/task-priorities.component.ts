import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskPriorities } from 'src/app/models/task-priorities';
import { TaskPriorityService } from 'src/app/services/task-priority.service';

@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.scss']
})
export class TaskPrioritiesComponent implements OnInit {
  taskPriorities: TaskPriorities[] = [];
  selectedTaskPriority: TaskPriorities = new TaskPriorities();
  isEditing: boolean = false;

  constructor(private taskPriorityService: TaskPriorityService) { }

  ngOnInit(): void {
    this.getTaskPriorities();
  }

  getTaskPriorities(): void {
    this.taskPriorityService.getTaskPriorities()
      .subscribe(taskPriorities => this.taskPriorities = taskPriorities);
  }

  selectTaskPriority(taskPriority: TaskPriorities): void {
    this.selectedTaskPriority = { ...taskPriority };
    this.isEditing = true;
  }

  addTaskPriority(form: NgForm): void {
    if (form.valid) {
      this.taskPriorityService.addTaskPriority(this.selectedTaskPriority)
        .subscribe(newTaskPriority => {
          this.taskPriorities.push(newTaskPriority);
          this.selectedTaskPriority = new TaskPriorities(); 
          form.resetForm();
        });
    }
  }

  updateTaskPriority(): void {
    this.taskPriorityService.updateTaskPriority(this.selectedTaskPriority)
      .subscribe(() => {
        const index = this.taskPriorities.findIndex(tp => tp.taskPriorityId === this.selectedTaskPriority.taskPriorityId);
        if (index !== -1) {
          this.taskPriorities[index] = this.selectedTaskPriority;
        }
        this.selectedTaskPriority = new TaskPriorities();  // Reset form
        this.isEditing = false;
      });
  }

  deleteTaskPriority(taskPriorityId: number): void {
    this.taskPriorityService.deleteTaskPriority(taskPriorityId)
      .subscribe(() => {
        this.taskPriorities = this.taskPriorities.filter(tp => tp.taskPriorityId !== taskPriorityId);
      });
  }

  cancelEdit(): void {
    this.selectedTaskPriority = new TaskPriorities();  // Reset form
    this.isEditing = false;
  }
}
