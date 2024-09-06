import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project:Project;
  routeParamsSubcription : Subscription |any;

  constructor(private activatedRoute:ActivatedRoute,private projectService:ProjectsService) { 
    this.project = new Project();
  }

  ngOnInit(): void {
    this.routeParamsSubcription = this.activatedRoute.params.subscribe((params)=>{
      let pid = params["projectid"];
      this.projectService.getProjectByProject(pid).subscribe((proj)=>{
        this.project = proj[0]
      })
    })
  }

}
