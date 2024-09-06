import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/models/project';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientLocation } from 'src/app/models/client-location';
import { ClientLocationService } from 'src/app/services/client-location.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { NgSelectModule } from '@ng-select/ng-select'; 



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectNames: Project[];
  clientLocations: ClientLocation[] = [];

  showLoading: boolean = true;

  newProject = new Project();
  editProject: Project = new Project();
  editIndex: number = 0;
  isModalVisible: boolean = false
  deleteProject: Project = new Project();
  deleteIndex: number = 0;
  searchBy: string ;
  searchText: string = ""
  project: any;
  newProjectID: any;
  newForms: any;
  myForm: any;
  currentPageIndex:number=0;
  pages:any[]=[];
  pageSize:number = 8;



  options = [
    { value: 'projectID', label: 'Project ID' },
    { value: 'projectName', label: 'Project Name' },
    { value: 'projectOfStart', label: 'Date Of Start' },
    { value: 'teamSize', label: 'Team Size' }
  ];


  constructor(private projectService: ProjectsService, private modalService: NgbModal, private clientLocationService: ClientLocationService) {

  }


  ngOnInit(): void {

    this.projectService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projectNames = response || [];
        this.showLoading = false
        this.calculateNoOfPages(); 
      }
    );

    this.clientLocationService.getClientLocations().subscribe(
      (res) => {
        this.clientLocations = res || [];
      }
    );
  }

  calculateNoOfPages(){
    let filterPipe = new FilterPipe();
    var resultProject = filterPipe.transform(this.projectNames,this.searchBy,this.searchText)
    var noOfPages = Math.ceil(resultProject.length/this.pageSize)
    this.pages = []
    
    for(let i = 0;i< noOfPages;i++){
      this.pages.push({pageIndex:i})
    }
    this.currentPageIndex = 0;
  }

  // isAllChecked: boolean = false

  // @ViewChildren("prj") projs: QueryList<ProjectComponent>
  // isAllcheckedChange(event:any){
  //   let proj = this.projs.toArray();
  //   for (let i=0;i<=proj.length;i++){
  //     proj[i].isAllCheckedChange(this.isAllChecked)
  //   }
  // }
  @ViewChild("prjID")prjID:ElementRef;
  ngAfterViewInit() {
    setTimeout(() => {
      this.prjID.nativeElement.focus();
    }, 0);
  }

  onSaveClick() {
    this.projectService.insertProjects(this.newProject).subscribe(
      (response) => {
        //new project add
        const p: Project = new Project();
        p.projectID = this.newProject.projectID;
        p.projectName = this.newProject.projectName;
        p.projectOfStart = this.newProject.projectOfStart;
        p.teamSize = this.newProject.teamSize;
        p.clientLocationName = this.newProject.clientLocationName
        p.active = this.newProject.active
        p.clientLocationID = this.newProject.clientLocationID
        p.status = this.newProject.status
        this.projectNames.push(p);

        //to clear the text boxes
        this.newProject.projectID = 0;
        this.newProject.projectName = "";
        this.newProject.projectOfStart = '';
        this.newProject.teamSize = 0;
        this.newProject.active = false;
        this.newProject.status = '';
        this.newProject.clientLocationID = 0;

        this.calculateNoOfPages(); 

      }, (error) => {
        console.log(error);
      }
    )
  }

  onEditClick(event: any, index: number) {
    this.editProject.projectID = this.projectNames[index].projectID;
    this.editProject.projectName = this.projectNames[index].projectName;
    this.editProject.projectOfStart = this.projectNames[index].projectOfStart;
    this.editProject.teamSize = this.projectNames[index].teamSize;
    this.editProject.active = this.projectNames[index].active;
    this.editProject.status = this.projectNames[index].status;
    this.editProject.clientLocationID = this.projectNames[index].clientLocationID;
    this.editProject.clientLocationName = this.projectNames[index].clientLocationName;
    this.editIndex = index;
    this.isModalVisible = true; // Show the modal


  }

  onUpdateClick() {
    this.projectService.updateProject(this.editProject, this.editProject.projectID).subscribe(
      (response: Project[]) => {
        var p: Project = new Project();
        p.projectID = this.newProject.projectID;
        p.projectName = this.newProject.projectName;
        p.projectOfStart = this.newProject.projectOfStart;
        p.teamSize = this.newProject.teamSize;
        p.active = this.newProject.active;
        p.status = this.newProject.status;
        p.clientLocationID = this.newProject.clientLocationID;
        p.clientLocationName = this.newProject.clientLocationName;
        this.projectNames[this.editIndex] = p;



        //to clear the text boxes
        this.newProject.projectID = 0;
        this.newProject.projectName = "";
        this.newProject.projectOfStart = '';
        this.newProject.teamSize = 0;
        this.projectService.getAllProjects().subscribe(
          (response: Project[]) => {
            this.projectNames = response;
            console.log(this.modalService);
          }
        )


      }, (error) => {
        console.log(error);
      }
    )
  }

  onDeleteClick($event: any, index: number) {
    this.deleteIndex = index;
    this.deleteProject.projectID = this.projectNames[index].projectID;
    this.deleteProject.projectName = this.projectNames[index].projectName;
    this.deleteProject.projectOfStart = this.projectNames[index].projectOfStart;
    this.deleteProject.teamSize = this.projectNames[index].teamSize
  }

  onDeleteConformClick() {
    this.projectService.deleteProject(this.deleteProject.projectID).subscribe(
      (response) => {
        this.projectNames.splice(this.deleteIndex, 1);
        this.deleteProject.projectID = 0;
        this.deleteProject.projectName = '';
        this.deleteProject.projectOfStart = '';
        this.deleteProject.teamSize = 0

        this.calculateNoOfPages(); 

      }, (error) => {
        console.log(error);
      }
    )
  }
  onSearchClick() {
    // this.projectService.searchProjects(this.searchBy, this.searchText).subscribe(
    //   (response: Project[]) => {
    //     this.projectNames = response;
    //   }, (error) => {
    //     console.log(error);
    //   }
    // )
  }
  onSearchTextKeyup(event:any){
    this.calculateNoOfPages()
  }
  onPageIndexClicked(pageIndex:number){
    this.currentPageIndex = pageIndex;
  }

}
