import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Designation: string = '';
  UserName: string = '';
  NoOfTeamMembers: number = 0;
  TotalCostOfAllProjects: number = 0;
  PendingTasks: number = 0;
  UpComingProjects: number = 0;
  ProjectCost: number = 0;
  CurrentExpenditure: number = 0;
  AvailableFunds: number = 0;
  Clients: string[];
  Projects: string[];
  Years: number[] = [];
  TeamMembersSummery: any;
  TeamMembers: any;
  currentDate:Date;

  constructor(private dashboardService:DashboardService){

  }



  ngOnInit(): void {

    this.Designation = "Team Leader";
    this.UserName = "Pankaj B";
    this.NoOfTeamMembers = 102;
    this.TotalCostOfAllProjects = 1200000;
    this.PendingTasks = 10;
    this.UpComingProjects = 3
    this.ProjectCost = 300000;
    this.CurrentExpenditure = 2300000;
    this.AvailableFunds = 70000;
    this.currentDate  = new Date()
    this.Clients = [
      "Everest IMS Technologies", "ABC Infotech Pvt. Ltd.", "Aquafine Tech Solutions", "TEK Systems"
    ];
    this.Projects = [
      "Project A", "Project B", "Project C", "Project D"
    ];
    for (var i = 2024; i >= 2010; i--) {
      this.Years.push(i);
    };
    this.TeamMembersSummery = this.dashboardService.getTeamMembersSummery();
    this.TeamMembers = [
      {
        Region: "East", Members: [{ ID: 1, Name: "Pankaj", Status: "Available" },
        { ID: 2, Name: "Binod", Status: "Available" },
        { ID: 3, Name: "Suvendu", Status: "Busy" },
        { ID: 4, Name: "Pritiraj", Status: "Busy" }
        ]
      },
      {
        Region: "West", Members: [{ ID: 1, Name: "Pankaj", Status: "Available" },
        { ID: 2, Name: "Binod", Status: "Available" },
        { ID: 3, Name: "Suvendu", Status: "Busy" },
        { ID: 4, Name: "Pritiraj", Status: "Busy" }
        ]
      },
      {
        Region: "South", Members: [{ ID: 1, Name: "Pankaj", Status: "Available" },
        { ID: 2, Name: "Binod", Status: "Available" },
        { ID: 3, Name: "Suvendu", Status: "Busy" },
        { ID: 4, Name: "Pritiraj", Status: "Busy" }
        ]
      },
      {
        Region: "North", Members: [{ ID: 1, Name: "Pankaj", Status: "Available" },
        { ID: 2, Name: "Binod", Status: "Available" },
        { ID: 3, Name: "Suvendu", Status: "Busy" },
        { ID: 4, Name: "Pritiraj", Status: "Busy" }
        ]
      }

    ]
  }
  onProjectChange($event: any) {
    // console.log($event.target.innerHTML);
    if ($event.target.innerHTML == "Project A") {
      this.ProjectCost = 300000;
      this.CurrentExpenditure = 230000;
      this.AvailableFunds = 70000;
    }else if($event.target.innerHTML == "Project B"){
      this.ProjectCost = 700000;
      this.CurrentExpenditure = 530000;
      this.AvailableFunds = 170000;
    }else if($event.target.innerHTML == "Project C"){
      this.ProjectCost = 560000;
      this.CurrentExpenditure = 29000;
      this.AvailableFunds = 531000;
    }else if($event.target.innerHTML == "Project D"){
      this.ProjectCost = 1300000;
      this.CurrentExpenditure = 1200000;
      this.AvailableFunds = 100000;
    }
  }

}
