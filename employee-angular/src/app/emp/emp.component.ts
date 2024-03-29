import { EmployeeService } from '../employees/employee.service';
import { StateService } from '../lov/states/state.service';
import { Employee } from '../employees/employee';
import { State } from '../lov/states/state.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ValidatorFn} from '@angular/forms'

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


  formValidationMessages = {
    firstName: [{ type: 'required', message: 'First Name is required' },{ type: 'maxlength', message: 'Name cannot be more than 30 characters long' } ],
    lastName: [{ type: 'maxlength', message: 'Name cannot be more than 30 characters long' } ]
  };


  constructor(private route: ActivatedRoute, private fb: FormBuilder, 
    private employeeService: EmployeeService, private stateService: StateService,
    private router: Router) {

    this.stateService.getStatesList().subscribe((res) => {
      this.stateList = res as State[];
    });


    this.setFormGroupControls();


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

           this.empForm.controls.firstName.setValue(this.employee.firstName);

           for (var key in this.employee) {
             this.empForm.controls[key].setValue(this.employee[key]);
          }



        }, error => console.log(error));

    } else
    {
      this.isNew = true;
      //this.setFormGroupControls();
    }



  }

  changeCity(e) {
    console.log(e.value)
    this.employee.state= e.target.value;
  }

  setFormGroupControls(){
    const youngerThanValidator = (maxAge: number): ValidatorFn => control =>
  (new Date()).getFullYear() - (new Date(control.value)).getFullYear() > maxAge 
    ? { younger: { maxAge } } 
    : null;

    this.empForm = this.fb.group({
      id: [{value: '', disabled: true}],
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      gender: [''],
      active: [''],
      dob: [''],
      description: [''],
      state: ['']
    });
    
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
  //  for (var key in this.employee) {
  //     this.employee[key] = this.empForm.controls[key].value;
  //  }
    this.employee.firstName = this.empForm.controls.firstName.value;
    this.employee.lastName = this.empForm.controls.lastName.value;
    this.employee.emailId = this.empForm.controls.emailId.value;
    this.employee.dob = this.empForm.controls.dob.value;
    this.employee.active = this.empForm.controls.active.value;
    this.employee.description = this.empForm.controls.description.value;
    this.employee.state = this.empForm.controls.state.value;
    this.employee.gender = this.empForm.controls.gender.value;
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