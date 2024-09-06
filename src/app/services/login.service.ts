
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SignUpViewModel } from '../models/sign-up-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  getCurrentUserName(): string {
    throw new Error('Method not implemented.');
  }

  private httpClient: HttpClient;
  private _currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.getCurrentUser());
  public currentUser$ = this._currentUserSubject.asObservable();

  constructor(
    private httpBackend: HttpBackend,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {
    this.httpClient = new HttpClient(this.httpBackend);
  }
  currentUserRole:string='';



  public detectIfAlreadyLogedIn() {
    const currentUser = this.getCurrentUser();
    if (currentUser && !this.isTokenExpired(currentUser.token)) {
      console.log('Detected current user on app init:', currentUser);
      this._currentUserSubject.next(currentUser);
      this.currentUserRole = currentUser.user.role;
    } else {
      this.logout(); 
    }
  }
  
  

  public login(loginViewModel: any) {
    return this.httpClient.post<any>("http://127.0.0.1:5000/login", loginViewModel)
      .pipe(
        map(user => {
          if (user && user.token) {
            this.currentUserRole = user.user.role;
            console.log(this.currentUserRole,'service role');
            
            localStorage.setItem("currentUser", JSON.stringify(user));
            this._currentUserSubject.next(user);
          }
          return user;
        }),
        catchError(this.handleError)
      );
  }

  public register(signUpViewModel: SignUpViewModel) {
    return this.httpClient.post<any>("http://127.0.0.1:5004/signup", signUpViewModel)
      .pipe(
        map(response => {
          if (response && response.token) {
            this.login({
              email: signUpViewModel.email,
              password: signUpViewModel.password
            }).subscribe(() => {
              this.router.navigate(['/Employee/tasks']);
            });
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  public logout() {
    localStorage.removeItem("currentUser");
    this._currentUserSubject.next(null); 
    this.router.navigate(['/login']);
  }
  

  public isAuthenticated(): boolean {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const token = currentUser.token;
      return !!token && !this.isTokenExpired(token);
    }
    return false;
  }

  private isTokenExpired(token: string): boolean {
    return this.jwtHelperService.isTokenExpired(token);
  }

  private getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }


 public getAllEmployees(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:5000/users");
 }


 
}
