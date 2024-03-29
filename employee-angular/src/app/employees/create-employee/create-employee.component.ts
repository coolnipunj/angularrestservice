import { EmployeeService } from '../employee.service';
import { StateService } from '../../lov/states/state.service';
import { Employee } from '../employee';
import { State } from '../../lov/states/state.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html'
})
export class CreateEmployeeComponent implements OnInit {

  isNew = false;

  employee: Employee = new Employee();

  stateList: State[];

  submitted = false;

  checked = false;

  constructor(private employeeService: EmployeeService, private stateService: StateService,
    private router: Router) { 

      this.stateService.getStatesList().subscribe((res) => {
        this.stateList = res as State[];
    });

    }
  

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;

    if(this.employee.active == null)
      this.employee.active = false;

    this.save(); 

  }

  saveForm() {

    // if (this.isNew) {
    //     this.surveyService.add(this.selectedSurvey).subscribe(res => {
    //         console.log(res);
    //     });
    // } else {
    //     console.log("Before sending the data to service:" + this.selectedSurvey.getId());
    //     this.surveyService.update(this.selectedSurvey).subscribe(res => {
    //         console.log(res);
    //     });
    // }
    // this.snackBar.open('Success', 'Close', {
    //     duration: 5000, verticalPosition: 'top',
    //     horizontalPosition: 'end', panelClass: 'nrm-success-snackbar-style'
    // });


}  

resetForm() {
  // if (form) {
  //     form.reset();
  // }

  //this.selectedSurvey = new Survey(null);
}

  gotoList() {
    this.router.navigate(['/employees']);
  }
}