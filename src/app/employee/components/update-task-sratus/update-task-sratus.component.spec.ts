import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskSratusComponent } from './update-task-sratus.component';

describe('UpdateTaskSratusComponent', () => {
  let component: UpdateTaskSratusComponent;
  let fixture: ComponentFixture<UpdateTaskSratusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTaskSratusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTaskSratusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
