import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import {fadeAnimation,slideUpAnimation,zoomUpAnimation} from './my-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [zoomUpAnimation]
})
export class AppComponent implements OnInit {
  constructor(public loginService:LoginService){

  }
  ngOnInit(): void {
    this.loginService.detectIfAlreadyLogedIn();
    this.loginService.isAuthenticated()
  }
  getState(outlet: any) {
    const state = outlet.isActivated ? outlet.activatedRoute.snapshot.url[0]?.path : 'none';
    console.log('Animation state:', state); 
    return state;
  }
  
}
