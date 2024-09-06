import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from '../../models/login-view-model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onLoginClick(event: any): void {
    this.subscription.add(
      this.loginService.login(this.loginViewModel).subscribe(
        (user: any) => {
          if (user && user.user) {
            const role = user.user.role;
            if (role === "admin") {
              this.router.navigate(["/admin", "dashboard"]);
            } else if (role === "Employee") {
              this.router.navigate(["/Employee", "tasks"]);
            }
          }
        },
        (error: any) => {
          console.error('Login Error:', error);
          this.loginError = 'Invalid Username or Password';
          alert(this.loginError);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
