import { EmployeeService } from "../employees/employee.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { StateService } from '../lov/states/state.service';
import { Employee } from '../employees/employee';
import { State } from '../lov/states/state.model';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


// import { EmployeeService } from '../../services/survey.service';
// import { Survey } from '../../models/surveys/survey.model';
// import { SurveySearch } from '../../models/surveys/emp-search.model';

@Component({
  selector: 'app-emp-search',
  templateUrl: './emp-search.component.html',
  styleUrls: ['./emp-search.component.css']
})
export class EmpSearchComponent implements OnInit {

  isLoading = false;  
  empForm: FormGroup;
  stateList: State[];


  public employeeDisplayedColumns = ['delete', 'firstName', 'lastName', 'emailId', 'gender', 'description', 'active', 'details', 'update'];
  public employeeDataSource = null;

  selectedRowIndex: string;
  @ViewChild('employeeTable', {static:false}) employeeSort: MatSort;
  @ViewChild('employeePaginator', {static:false}) employeePaginator: MatPaginator;

  private _routerSubscription: any;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, 
    private employeeService: EmployeeService, private stateService: StateService,
    private router: Router) {

      this.setFormGroupControls();
      this.stateService.getStatesList().subscribe((res) => {
        this.stateList = res as State[];
      });    
      
      
      this.employeeDataSource = new MatTableDataSource<Employee>();
      this._routerSubscription = this.route.url.subscribe(url => {
        this.reloadData();    
      });  

    }


  ngOnInit() {
    //this.reloadData();
  }

  ngOnDestroy(){
    // this._routerSubscription.unsubscribe();
  }
  reloadData() {
    this.employeeService.getEmployeesList().subscribe((res) => {
      this.employeeDataSource.data = res as Employee[];
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
      }
  }
  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }
  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }
  ngAfterViewInit(): void {
    // this.employeeDataSource.sort = this.employeeSort;
    // this.employeeDataSource.paginator = this.employeePaginator;
  }
  public doFilter = (value: string) => {
    this.employeeDataSource.filter = value.trim().toLocaleLowerCase();
  }


  setFormGroupControls(){
    
    this.empForm = this.fb.group({
      id: ['' ],
      firstName: [''],
      lastName: [''],
      emailId: [''],
      gender: [''],
      active: [''],
      dob: [''],
      description: [''],
      state: ['']
    });
  }


  searchEmp() {
    // this.isLoading = true;  
  
    // this.employeeService.search(JSON.stringify(this.empForm)).subscribe((res) => {
    //   this.employeeDataSource.data = res as Employee[];
    //   this.isLoading = false; 
    // });

    //   this.employeeDataSource = new MatTableDataSource<Employee>();
    //   this._routerSubscription = this._route.url.subscribe(url => {
    //     this.reloadData();

    //    this.isLoading = false;         
    // });

    //.pipe(delay(5000))
    // this.employeeService.search(JSON.stringify(this.surveySearch)).subscribe((res) => {
    //   this.surveySearchDataSource.data = res as Survey[];
    //   this.isLoading = false; 
    // });
        
  }  



}
