import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';

import { CountriesComponent } from '../countries/countries.component';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';
import { ComponentLoaderDirective } from 'src/app/directives/component-loader.directive';

interface Tab {
  tabIndex: number;
  itemName: string;
  displayName: string;
  viewContainerRef?: ViewContainerRef;

}
interface MenuItem {
  itemName: string;
  displayName: string;
  component: any;
}

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {

  masterMenuItems: MenuItem[] = [
    { itemName: "Countries", displayName: "Countries", component: CountriesComponent },
    { itemName: "ClientLocation", displayName: "Client Location", component: ClientLocationsComponent },
    { itemName: "TaskPriorities", displayName: "Task Priorities", component: TaskPrioritiesComponent },
    { itemName: "TaskStatus", displayName: "Task Status", component: TaskStatusComponent }
  ];

  activeItem: string = '';
  tabs: Tab[] = [];

  @ViewChildren(ComponentLoaderDirective)
  componentLoaders: QueryList<ComponentLoaderDirective>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  menuItemClick(clickedMasterMenuItem: MenuItem) {
    this.activeItem = clickedMasterMenuItem.itemName;

    let matchingTabs = this.tabs.filter((tab) => {
      return tab.itemName == clickedMasterMenuItem.itemName;
    });

    if (matchingTabs.length == 0) {
      this.tabs.push({
        tabIndex: this.tabs.length,
        itemName: clickedMasterMenuItem.itemName,
        displayName: clickedMasterMenuItem.displayName
      });

      setTimeout(() => {
        var componentLoadersArray = this.componentLoaders.toArray();
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(clickedMasterMenuItem.component);
        var viewContainerRef = componentLoadersArray[this.tabs.length - 1].viewContainerRef;
        var componentRef = viewContainerRef.createComponent(componentFactory);

        this.tabs[this.tabs.length - 1].viewContainerRef = viewContainerRef;

        if (clickedMasterMenuItem.component.name == "CountriesComponent") {
          var componentInstance = componentRef.instance as CountriesComponent;
          componentInstance.message = "Hello To Contries"
        }
      }, 100);
    }
  }
  onCloseClick(ClickedTab: any) {
    // console.log(ClickedTab);

    ClickedTab.viewContainerRef.remove()
    this.tabs.splice(this.tabs.indexOf(ClickedTab), 1);

    if(this.tabs.length > 0){
      this.activeItem = this.tabs[0].itemName
    }

  }
}
