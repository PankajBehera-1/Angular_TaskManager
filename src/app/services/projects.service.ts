import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Project } from '../models/project';
import { catchError, map } from 'rxjs/operators';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) {

  }
  getAllProjects() {
    // let currentUser = { token: '' };
    // let headers = new HttpHeaders();

    // const storedUser = sessionStorage.getItem('currentUser');
    // if (storedUser) {
    //   currentUser = JSON.parse(storedUser);
    //   headers = headers.set('Authorization', `Bearer ${currentUser.token}`);
    // } else {
    //   headers = headers.set('Authorization', 'Bearer');
    // }


    return this.httpClient.get<Project[]>("http://127.0.0.1:5002/projects", { responseType:"json"})
    .pipe(map((data: Project[]) => {
      return data.map(project => {
        // project.teamSize = project.teamSize * 10;
        return project;
      });
    }));
  }

  getProjectByProject(projectID: number): Observable<Project[]> {
    if (projectID === undefined || projectID === null) {
      return throwError(() => new Error('Project ID is required'));
    }
  
    return this.httpClient.get<Project[]>(`http://127.0.0.1:5002/projects`, {
      params: {
        projectID: projectID.toString()
      }
    }).pipe(
      catchError(error => {
        console.error('Error fetching projects:', error);
        return throwError(() => error);
      })
    );
  }
  
  
  insertProjects(newProject: Project) {
    return this.httpClient.post<Project[]>("http://127.0.0.1:5002/projects", newProject)
  }
  updateProject(exitingProject: Project, projectID: any) {
    return this.httpClient.put<Project[]>(`http://127.0.0.1:5002/projects/${projectID}`, exitingProject)
  }
  deleteProject(projectID: number) {
    return this.httpClient.delete<String>(`http://127.0.0.1:5002/projects/${projectID}`);
  }
  searchProjects(searchBy: string, searchText: string) {
    return this.httpClient.get<Project[]>(`http://127.0.0.1:5002/projects/search/` + searchBy + "/" + searchText)
  }



  // getAllProjects() {
  //   return this.httpClient.get<Project[]>("http://localhost:3000/projects")
  //   .pipe(map((data:Project[])=>{
  //     for(let i = 0;i<data.length;i++){
  //       data[i].teamSize = data[i].teamSize*10;
  //     }
  //     return data;
  //   }
  // ));
  // }
  // insertProjects( newProject: Project){
  //   return this.httpClient.post<Project[]>("http://localhost:3000/projects",newProject)
  // }
  // updateProject(exitingProject:Project,projectID:any){
  //   return this.httpClient.put<Project[]>(`http://localhost:3000/projects/${projectID}`,exitingProject)
  // }
  // deleteProject(projectID:number){
  //   return this.httpClient.delete<String>(`http://localhost:3000/projects/${projectID}`);
  // }
  // searchProjects(searchBy:string,searchText:string){
  //   return this.httpClient.get<Project[]>(`http://localhost:3000/projects/search/` + searchBy + "/" + searchText)
  // }
}
