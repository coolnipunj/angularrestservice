import { EmployeeService } from '../employees/employee.service';
import { StateService } from '../lov/states/state.service';
import { Employee } from '../employees/employee';
import { State } from '../lov/states/state.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './emp.component.html'
})
export class EmpComponent implements OnInit {

  isNew = false;

  employee: Employee = new Employee();

  stateList: State[];

  submitted = false;

  checked = false;

  empForm : FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private stateService: StateService,
    private router: Router) { 

      this.stateService.getStatesList().subscribe((res) => {
        this.stateList = res as State[];
    });

    }
    
  

  ngOnInit() {
    this.empForm = this.fb.group({
      firstName	  : ['', Validators.required],
      lastName    : ['', Validators.required],
      emailId     : ['', [Validators.required, Validators.email]],
      gender      : [''],
      active      : [''],
      dob         : [''],
      description : ['']    
    })
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

    this.setValues();

    this.employeeService.createEmployee(this.employee)
    .subscribe(data => console.log(data), error => console.log(error));
  this.employee = new Employee();
  this.gotoList();


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

setValues(){
  this.employee.firstName = this.empForm.controls.firstName.value;
  this.employee.lastName = this.empForm.controls.lastName.value;
  this.employee.emailId = this.empForm.controls.emailId.value;
  this.employee.dob = this.empForm.controls.dob.value;
  this.employee.active = this.empForm.controls.active.value;
  this.employee.description = this.empForm.controls.description.value;
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