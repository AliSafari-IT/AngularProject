import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './Services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { EmployeePersonListComponent } from './components/employee-person-list/employee-person-list.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EmployeeService,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeePersonListComponent,
    EmployeesListComponent,
    RouterOutlet
  ]
})

export class AppComponent implements OnInit {
  constructor(private employeeService: EmployeeService, private router: Router) { }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  employees: any = [];

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }
  title = 'FullstackAppWithAngularAndDotNetCoreApi';
}
