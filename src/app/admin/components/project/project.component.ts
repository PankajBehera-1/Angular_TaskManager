import { Component, ContentChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/project';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input("currentProject") project: Project;
  @Input("recordIndex") i: number;
  @Output() editClick = new EventEmitter<{ event: Event; index: number }>(); 
  @Output() deleteClick = new EventEmitter<{ event: Event; index: number }>();

  constructor() { }

  ngOnInit(): void {
  }
 
  onEditClick(event: Event, i: number): void {
    this.editClick.emit({ event, index: i });
  }

  onDeleteClick(event: Event, i: number): void {
    this.deleteClick.emit({ event, index: i });
  }



  // @ContentChild("selectionBox") selectionBox:CheckBoxPrinterComponent;
  // isAllCheckedChange(b:boolean){
  //   if(b){
  //     this.selectionBox.check();
  //   }else{
  //     this.selectionBox.unCheck()
  //   }
  // }
}
