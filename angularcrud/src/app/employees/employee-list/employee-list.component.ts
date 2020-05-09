import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Observable } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  //employees: Observable<Employee[]>;
  public employeeDisplayedColumns = ['delete', 'firstName', 'lastName', 'emailId', 'gender', 'description', 'active', 'details', 'update'];
  public employeeDataSource = null;

  selectedRowIndex: string;
  @ViewChild('employeeTable', {static:false}) employeeSort: MatSort;
  @ViewChild('employeePaginator', {static:false}) employeePaginator: MatPaginator;

  private _routerSubscription: any;
  constructor(private employeeService: EmployeeService,
    private _route: ActivatedRoute,private router: Router) {
      this.employeeDataSource = new MatTableDataSource<Employee>();
      this._routerSubscription = this._route.url.subscribe(url => {
        this.reloadData();
    });

    }



  ngOnInit() {
    this.reloadData();
  }

  ngOnDestroy(){
    this._routerSubscription.unsubscribe();
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
    this.employeeDataSource.sort = this.employeeSort;
    this.employeeDataSource.paginator = this.employeePaginator;
  }
  public doFilter = (value: string) => {
    this.employeeDataSource.filter = value.trim().toLocaleLowerCase();
  }

}