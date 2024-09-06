import { ClientLocation } from "./client-location";

export class Project {
    projectID:number;
    projectName:string;
    projectOfStart:string;
    teamSize:number;
    active:boolean;
    status:string;
    clientLocationID:number;
    clientLocationName:ClientLocation;
touched: any;

    constructor(){
        this.projectID = 0;
        this.projectName = "";
        this.projectOfStart = "";
        this.teamSize = 0;
        this.active = true;
        this.status = '';
        this.clientLocationID = 0;
        this.clientLocationName = new ClientLocation(); 


    }
}
