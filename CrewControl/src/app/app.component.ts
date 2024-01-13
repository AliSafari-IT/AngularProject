import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './Services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeePersonListComponent } from './components/employee-person-list/employee-person-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ChangeLogComponent } from './pages/change-log/change-log.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { AppRoutingModule } from './app.routes';
import { HomePageComponent } from "./pages/home/home-page/home-page.component";
import { ChangeLogContentComponent } from "./pages/change-log/change-log-content/change-log-content.component";
import { Router, RouterOutlet } from '@angular/router';

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
    HomeComponent,
    ChangeLogComponent,
    HomePageComponent,
    ChangeLogContentComponent,
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
