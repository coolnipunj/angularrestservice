import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EmpComponent } from './emp/emp.component';
import { EmpSearchComponent } from './emp/emp-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'emp-search', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add', component: CreateEmployeeComponent },
{ path: 'emp', component: EmpComponent },
{ path: 'emp-search', component: EmpSearchComponent },
{ path: 'update/:id', component: EmpComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }