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
  imports: [CommonModule, EmployeePersonListComponent, FormsModule,
  ],
  providers: []
})
export class EmployeesListComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  employees: Employee[] = [];
  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  lastSelectedEmployee: Employee | null = null;
  successMessage: any;
  errorMessage: any;
  warningMessage: any;
  infoMessage: any;
  searchInput: any;

  constructor(private employeeService: EmployeeService) { }

  editEmployees() {
    // if no employees are selected, alert user to select at least one employee to edit
    if (!this.employees.some(employee => employee.isSelected)) {
      alert('Please select at least one employee to edit.');
      return;
    }

    // Your code to edit the employee goes here
    // to edit you need to have  one employee selected

    // Reset the isSelected flag for the edited employee

  }

  deleteEmployees() {
    // if no employees are selected, alert user to select at least one employee to delete
    if (!this.employees.some(employee => employee.isSelected)) {
      alert('Please select at least one employee to delete.');
      return;
    }
    // Delete selected employees (employee.isSelected === true) when delete button is clicked
    this.employees = this.employees.filter(employee => !employee.isSelected);
  }

  unselectEmployees() {
    // Unselect all employees when unselect button is clicked
    this.employees = this.employees.map(employee => ({ ...employee, isSelected: false }));
    this.infoMessage = null;
    this.lastSelectedEmployee = null;
    this.successMessage = null;
    this.warningMessage = null;
    this.errorMessage = null;
  }

  // set lastSelectedEmployee to the employee that was just selected
  setLastSelectedEmployee(employee: Employee): void {
    if (employee.isSelected) {
      this.lastSelectedEmployee = employee;
    } else {
      this.lastSelectedEmployee = null;
    }

    console.log("Last selected employee:", this.lastSelectedEmployee);
    // set info message: if more than one employee is selected, display number of selected employees, else display "You have selected 1 employee: (EmployeeId & Department). 
    if (this.employees.filter(employee => employee.isSelected).length > 1) {
      this.infoMessage = `You have selected ${this.employees.filter(employee => employee.isSelected).length} employees.`;
    } else {
      const selectedEmployee = this.employees.find(employee => employee.isSelected);
      if (!selectedEmployee) {
        return;
      }
      this.infoMessage = `You have selected 1 employee: (${selectedEmployee?.employeeId} & ${selectedEmployee?.department}).`;
    }
    const editButton = document.querySelector('#edit-button-selected-employee');
    const selectedEmployees = this.employees.filter(employee => employee.isSelected);


    // Edit the selected employee here
    const selectedEmployee = selectedEmployees[0];
    if (selectedEmployees.length > 1) {
      // if more than one employee is selected, make Edit button hidden
      editButton?.setAttribute('hidden', 'true');
      this.warningMessage = 'You can only edit one employee at a time.';
    } else {
      editButton?.removeAttribute('hidden');
      this.warningMessage = '';
    }
    return;
  }

  // Unsubscribe from the Subject when the component is destroyed
  // to prevent memory leaks
  // https://angular.io/guide/lifecycle-hooks


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
    this.employeeService.getEmployees().subscribe(employees => { this.employees = employees; this.allEmployees = employees; });
  }

  searchEmployees() {
    if (this.searchInput) {
      const searchInputLowerCase = this.searchInput.toLowerCase();
      this.employees = this.allEmployees.filter(employee => {
        // Convert employeeId to string and check if it includes the search input
        const idMatch = employee.employeeId.toString().includes(this.searchInput);
    
        // Check if department (converted to lowercase) includes the search input
        const departmentMatch = employee.department?.toLowerCase().includes(searchInputLowerCase);
  
        // Return true if either idMatch or departmentMatch is true
        return idMatch || departmentMatch;
      });
  
      // Update infoMessage based on the number of filtered employees
      if (this.employees.length > 0) {
        this.infoMessage = `Found ${this.employees.length} employees.`;
      } else {
        this.infoMessage = 'No employees found.';
      }
    } else {
      this.employees = [...this.allEmployees];
      this.infoMessage = null; // Reset the info message when there's no search input
    }
  }
  
}
