import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-locations',
  templateUrl: './client-locations.component.html',
  styleUrls: ['./client-locations.component.scss']
})
export class ClientLocationsComponent implements OnInit {
  clientLocations: { id: number, name: string }[] = [];
  nextId: number = 1; 

  constructor() { }

  ngOnInit(): void {

    this.clientLocations = [
      { id: this.nextId++, name: 'New York' },
      { id: this.nextId++, name: 'Los Angeles' },
      { id: this.nextId++, name: 'Chicago' },
      { id: this.nextId++, name: 'Houston' },
      { id: this.nextId++, name: 'Miami' }
    ];
  }

  addLocation(name: string): void {
    if (name.trim()) {
      this.clientLocations.push({ id: this.nextId++, name: name.trim() });
    }
  }

  deleteLocation(id: number): void {
    this.clientLocations = this.clientLocations.filter(location => location.id !== id);
  }
}
