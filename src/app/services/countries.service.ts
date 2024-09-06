import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../models/country';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = 'http://127.0.0.1:5006/countries';  // URL to the Flask API

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Get all countries
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  createCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, country);
  }
  
  // Get country by ID
  getCountry(id: number): Observable<Country> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Country>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Add a new country
  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, country, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a country
  updateCountry(id: number, country: Country): Observable<Country> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Country>(url, country, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a country
  deleteCountry(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<{}>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle HTTP errors
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
