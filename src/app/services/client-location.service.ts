import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientLocation } from '../models/client-location';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationService {

  constructor(private httpClient:HttpClient ) {

   }

   getClientLocations(){
    return this.httpClient.get<ClientLocation[]>("http://127.0.0.1:5002/projects",{responseType:"json"});

   }
}
