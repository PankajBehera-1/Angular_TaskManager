import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ensure CommonModule is imported if needed
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module'; // Adjust path if needed

import { TasksComponent } from './components/tasks/tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

import { EmployeeRoutingModule } from './components/employee-routing/employee-routing.module'; // Ensure correct path
import { UpdateTaskSratusComponent } from './components/update-task-sratus/update-task-sratus.component';

@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskSratusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule,
    NgSelectModule
  ],
  exports: [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskSratusComponent
  ]
})
export class EmployeeModule { }
