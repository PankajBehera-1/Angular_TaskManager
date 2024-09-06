import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TaskPriorities } from '../models/task-priorities';


@Injectable({
  providedIn: 'root'
})
export class TaskPriorityService {
  private apiUrl = 'http://127.0.0.1:5008/task_priorities';  // URL to the Flask API

  constructor(private http: HttpClient) { }

  /** GET all task priorities from the server */
  getTaskPriorities(): Observable<TaskPriorities[]> {
    return this.http.get<TaskPriorities[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('fetched task priorities')),
        catchError(this.handleError<TaskPriorities[]>('getTaskPriorities', []))
      );
  }

  /** GET task priority by id. Will 404 if id not found */
  getTaskPriority(id: number): Observable<TaskPriorities> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TaskPriorities>(url)
      .pipe(
        tap(_ => console.log(`fetched task priority id=${id}`)),
        catchError(this.handleError<TaskPriorities>(`getTaskPriority id=${id}`))
      );
  }

  /** POST: add a new task priority to the server */
  addTaskPriority(taskPriority: TaskPriorities): Observable<TaskPriorities> {
    return this.http.post<TaskPriorities>(this.apiUrl, taskPriority, this.httpOptions)
      .pipe(
        tap((newTaskPriority: TaskPriorities) => console.log(`added task priority w/ id=${newTaskPriority.taskPriorityId}`)),
        catchError(this.handleError<TaskPriorities>('addTaskPriority'))
      );
  }

  /** PUT: update the task priority on the server */
  updateTaskPriority(taskPriority: TaskPriorities): Observable<any> {
    const url = `${this.apiUrl}/${taskPriority.taskPriorityId}`;
    return this.http.put(url, taskPriority, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated task priority id=${taskPriority.taskPriorityId}`)),
        catchError(this.handleError<any>('updateTaskPriority'))
      );
  }

  /** DELETE: delete the task priority from the server */
  deleteTaskPriority(id: number): Observable<TaskPriorities> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<TaskPriorities>(url)
      .pipe(
        tap(_ => console.log(`deleted task priority id=${id}`)),
        catchError(this.handleError<TaskPriorities>('deleteTaskPriority'))
      );
  }

  /** Error handling */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** HTTP options */
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
