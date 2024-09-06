import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupedTask } from '../models/grouped-task';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = 'http://127.0.0.1:5010/tasks'; 

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<GroupedTask[]> {
    return this.httpClient.get<GroupedTask[]>(this.apiUrl);
  }

  insertTask(newTask: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.apiUrl, newTask, { responseType: 'json' });
  }

  getTasksByTaskID(taskID: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/${taskID}`);
  }

  updateTaskStatus(taskID: number, updatedTask: { currentStatus: number }): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${taskID}`, updatedTask);
  }

  deleteTask(taskID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${taskID}`);
  }
}
