import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../models/Employee';
import { EmployeePersonListComponent } from '../employee-person-list/employee-person-list.component';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../controls/alert-dialog/alert-dialog.component';
import { NotificationsComponent } from "../../controls/notifications/notifications.component";
import { FormsModule } from '@angular/forms';
import { AddEditEmployeeFormComponent } from "../addedit-employee-form/addedit-employee-form.component";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  standalone: true,
  providers: [],
  schemas: [],
  imports: [CommonModule, EmployeePersonListComponent, FormsModule, NotificationsComponent, AddEditEmployeeFormComponent]
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
  infoMessageHtml: any;
  infoMessage: any;
  searchInput: any;
  showAddEditEmployeeForm: boolean = false;
  isEditing: boolean = false;
  isAdding: boolean = false;
  selectedEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }

  refreshTableData() {
    this.employees = [];
    this.unselectEmployees();
    this.onSubmitClicked();
    setTimeout(() => {
      this.getEmployees();
    }, 200);

  }

  onSubmitClicked() {
    this.showAddEditEmployeeForm = false;
    this.isEditing = false;

  }

  editEmployees() {
    this.showAddEditEmployeeForm = true;

    // To edit the selected  employee:
    // 1. Get the selected employee
    const selectedEmployee = this.employees.find(employee => employee.isSelected)!;
    console.log("Selected employee to edit:", selectedEmployee);
  }

  deleteEmployees() {
    if (!this.employees.some(employee => employee.isSelected)) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Note',
          message: 'Please select at least one employee to delete.',
          type: 'warning',
          okButtonText: 'OK',
          onOkClick: () => { this.dialog.closeAll(); },
        },
        panelClass: 'alert-dialog',
      });
      return;
    }

    this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete the selected employee(s)?',
        type: 'warning',
        okButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        onOkClick: () => {
          const deletedEmployeesIds = this.employees.filter(employee => employee.isSelected).map(employee => employee.employeeId);
          const deletedEmployeesDetails = this.employees
            .filter(employee => employee.isSelected)
            .map(employee => `Id: ${employee.employeeId}, Department: ${employee.department}`);

          this.infoMessage = `Deleted ${deletedEmployeesDetails.length} employee(s):\n${deletedEmployeesDetails.join('\n')}`;

          this.employees = this.employees.filter(employee => !employee.isSelected);
          // Save the updated list of employees and alert the user if failed to save
          deletedEmployeesIds?.forEach(id => {
            this.employeeService.deleteEmployeeById(id).subscribe(() => {
              console.log(`Deleted employee with id: ${id}`);
              this.getEmployees();
            });
          });
          this.dialog.closeAll();
        },
        onCancelClick: () => {
          this.unselectEmployees();
          this.dialog.closeAll();
        }
      },
      panelClass: 'alert-dialog',
    });
  }


  unselectEmployees() {
    // Unselect all employees when unselect button is clicked
    this.employees = this.employees.map(employee => ({ ...employee, isSelected: false }));
    this.infoMessage = null;
    this.infoMessageHtml = null;
    this.lastSelectedEmployee = null;
    this.successMessage = null;
    this.warningMessage = null;
    this.errorMessage = null;
    this.searchInput = '';
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
        this.setInfoMessageNull();
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
      this.setInfoMessageNull();
      ; // Reset the info message when there's no search input
    }
  }

  // set infoMessage to null when no employees are selected
  setInfoMessageNull(): void {
    this.infoMessage = null;
  }

  toggleShowEditEmployeeForm() {
    // if no employees are selected, alert user to select at least one employee to edit
    if (!this.employees.some(employee => employee.isSelected)) {
      alert('Please select at least one employee to edit.');
    } else {
      this.isEditing = true;
      this.selectedEmployee = this.employees.find(employee => employee.isSelected)!;
      this.showAddEditEmployeeForm = !this.showAddEditEmployeeForm;

    }
  }

  onCloseButtonClick() {
    this.isEditing = false;
    this.showAddEditEmployeeForm = false;
    this.employees = this.employees.map(employee => ({ ...employee, isSelected: false }));
  }

}