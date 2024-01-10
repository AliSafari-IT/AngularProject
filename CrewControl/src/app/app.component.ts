import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeService } from './Services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    PeopleComponent,
    EmployeesListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [EmployeeService,],
})

export class AppComponent implements OnInit {
  employees: any = [];
  constructor(private employeeService: EmployeeService) { }
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }
  title = 'FullstackAppWithAngularAndDotNetCoreApi';
}
