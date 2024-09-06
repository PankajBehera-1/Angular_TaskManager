import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CanDeactivateGaurdService } from './gaurds/can-deactivate-gaurd.service';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent,canDeactivate:[CanDeactivateGaurdService] },
  { path: "about", component: AboutComponent },
  {path:"admin",loadChildren:()=>import("./admin/admin.module").then(m => m.AdminModule)},
  {path:"Employee",loadChildren:()=>import("./employee/employee.module").then(m => m.EmployeeModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true,preloadingStrategy:PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
