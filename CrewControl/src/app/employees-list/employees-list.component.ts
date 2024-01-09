import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../models/Employee';
import { EmployeePersonListComponent } from '../employee-person-list/employee-person-list.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  standalone: true,
  imports: [CommonModule, EmployeePersonListComponent, FormsModule],  
  providers: []
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getEmployees();
    this.employeeService.employeeUpdate$.subscribe(() => {
      this.getEmployees(); // Reload employees when notified
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }
}
