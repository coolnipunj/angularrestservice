import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule, // Material module added
    HttpClientModule, BrowserAnimationsModule
  ],
  exports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule, // Material module added
    FlexLayoutModule
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }