import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './Services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeesListComponent } from "./components/employees-list/employees-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [EmployeeService],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterOutlet,
        EmployeesListComponent
    ]
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
