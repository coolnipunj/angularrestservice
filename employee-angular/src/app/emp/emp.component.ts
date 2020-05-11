import { EmployeeService } from '../employees/employee.service';
import { StateService } from '../lov/states/state.service';
import { Employee } from '../employees/employee';
import { State } from '../lov/states/state.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  empForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, 
    private employeeService: EmployeeService, private stateService: StateService,
    private router: Router) {

    this.stateService.getStatesList().subscribe((res) => {
      this.stateList = res as State[];
    });

  }



  ngOnInit() {


    this.employee.id = this.route.snapshot.params['id'];

    console.log("Before this.employee.id");
    // if update
    if (this.employee.id) {
      console.log("In this.employee.id");

      this.isNew = false;

      this.employeeService.getEmployee(this.employee.id)
        .subscribe(data => {
          console.log(data)
          this.employee = data;

          console.log("First Name inside if clause=" + this.employee.firstName);
          //this.setFormGroupControls();

          // this.empForm.controls.firstName.value = this.employee.firstName;
          //   this.employee.lastName = this.empForm.controls.lastName.value;
          //   this.employee.emailId = this.empForm.controls.emailId.value;
          //   this.employee.dob = this.empForm.controls.dob.value;
          //   this.employee.active = this.empForm.controls.active.value;
          //   this.employee.description = this.empForm.controls.description.value;

          // this.empForm = this.fb.group({
          //   firstName: [this.employee.firstName, Validators.required],
          //   lastName: ['', Validators.required],
          //   emailId: ['', [Validators.required, Validators.email]],
          //   gender: [''],
          //   active: [''],
          //   dob: [''],
          //   description: ['']
          // });



        }, error => console.log(error));

    } else
    {
      this.isNew = true;
      //this.setFormGroupControls();
    }

      // setFormGroupControls(){
    this.empForm = this.fb.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      gender: [''],
      active: [''],
      dob: [''],
      description: ['']
    });
  
    //console.log("First Name=" + this.employee.firstName);


  }

  // setFormGroupControls(){
  //   this.empForm = this.fb.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     emailId: ['', [Validators.required, Validators.email]],
  //     gender: [''],
  //     active: [''],
  //     dob: [''],
  //     description: ['']
  //   });
  // }

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

    if (this.employee.active == null)
      this.employee.active = false;

    this.save();

  }

  saveForm() {

    this.setValues();

    // this.employeeService.createEmployee(this.employee)
    // .subscribe(data => console.log(data), error => console.log(error));
    // this.employee = new Employee();


    if (this.isNew) {
      this.employeeService.createEmployee(this.employee).subscribe(res => {
        console.log(res);
      });
    } else {
      //console.log("Before sending the data to service:" + this.selectedSurvey.getId());
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(res => {
        console.log(res);
      });
    }

    this.employee = new Employee();
    this.gotoList();

  }

  setValues() {
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