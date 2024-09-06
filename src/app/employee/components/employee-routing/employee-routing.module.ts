import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { UpdateTaskSratusComponent } from '../update-task-sratus/update-task-sratus.component'; 
import { CanActiveGuardService } from 'src/app/gaurds/can-active-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [CanActiveGuardService],
    data: { expectedRole: 'Employee' },
    children: [
      { path: 'tasks', component: TasksComponent, canActivate: [CanActiveGuardService], data: { expectedRole: 'Employee' } },
      { path: 'createtask', component: CreateTaskComponent, canActivate: [CanActiveGuardService], data: { expectedRole: 'Employee' } },
      { path: 'edittask/:taskid', component: EditTaskComponent, canActivate: [CanActiveGuardService], data: { expectedRole: 'Employee' } },
      { path: 'updatetaskstatus/:taskid', component: UpdateTaskSratusComponent, canActivate: [CanActiveGuardService], data: { expectedRole: 'Employee' } },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule] // Export RouterModule to make sure other modules can use these routes if needed
})
export class EmployeeRoutingModule { }
