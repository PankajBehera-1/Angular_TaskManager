import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ProjectDetailsComponent } from '../components/project-details/project-details.component';
import { MastersComponent } from '../components/masters/masters.component';
import { CanActiveGuardService } from '../../gaurds/can-active-guard.service';

const routes: Routes = [
  {
    path: '', canActivate: [CanActiveGuardService], data: { expectedRole: 'admin' }, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/view/:projectid', component: ProjectDetailsComponent },
      { path: 'masters', component: MastersComponent },
      // { path: '**', redirectTo: 'masters' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
