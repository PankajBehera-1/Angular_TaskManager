import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {

  form: FormGroup;
  cities = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Los Angeles' },
    { id: 3, name: 'Chicago' },
    { id: 4, name: 'Houston' }
  ];

  approvalUsers = [
    { name: 'Alice Johnson', avatar: 'assets/avatar1.png', email: 'demo@gmail.com' },
    { name: 'Bob Smith', avatar: 'assets/avatar2.jpg', email: 'demo@gmail.com' },
    { name: 'Jack Charlie', avatar: 'assets/avatar2.jpg', email: 'demo@gmail.com' },
    { name: 'Oggy Charlie', avatar: 'assets/avatar4.jpg', email: 'demo@gmail.com' },
    { name: 'Charlie Snoks', avatar: 'assets/avatar5.jpg', email: 'demo@gmail.com' }
  ];
  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rules: this.fb.array([]),
    });

    this.addRule();
    console.log(this.form);
    
  }

  get rules(): FormArray {
    return this.form.get('rules') as FormArray;
  }


  createRule(): FormGroup {
    return this.fb.group({
      cities: [[]],
      approvers: this.fb.array([
        this.createApprover()
      ])
    });
  }

  createApprover(): FormGroup {
    return this.fb.group({
      threshold: [''],
      approver: [{ name: '', avatar: '', email: '' }]
    });
  }

  addRule(): void {
    this.rules.push(this.createRule());
  }

  // removeRule(index: number): void {
  //   this.rules.removeAt(index);
  // }
  getApprovers(ruleIndex: number): FormArray {
    const rule = this.rules.at(ruleIndex) as FormGroup;
    return rule.get('approvers') as FormArray;
  }

  addApprover(ruleIndex: number): void {
    const rule = this.rules.at(ruleIndex) as FormGroup;
    const approvers = rule.get('approvers') as FormArray;
    approvers.push(this.createApprover());
  }

  removeApprover(ruleIndex: number, approverIndex: number): void {
    const rule = this.rules.at(ruleIndex) as FormGroup;
    const approvers = rule.get('approvers') as FormArray;
    approvers.removeAt(approverIndex);
  }
}
