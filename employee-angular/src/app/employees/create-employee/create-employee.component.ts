import { EmployeeService } from '../employee.service';
import { StateService } from '../../lov/states/state.service';
import { Employee } from '../employee';
import { State } from '../../lov/states/state.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  //stateList: Array<any> = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']


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

  gotoList() {
    this.router.navigate(['/employees']);
  }
}