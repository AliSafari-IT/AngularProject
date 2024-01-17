import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/Employee';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-addedit-employee-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './addedit-employee-form.component.html',
  styleUrl: './addedit-employee-form.component.scss',
  providers: [],
  styles: [],

})
export class AddEditEmployeeFormComponent implements

  OnInit {
  @Output() closeForm = new EventEmitter<void>();
  @Output() submissionSuccess = new EventEmitter<void>(); // New event emitter
  @Input() isEditMode: boolean = false;
  @Input() selectedEmployee: Employee | undefined;
  @Output() submitClicked = new EventEmitter<void>();
  @Output() infoMessage = '';

  addEmployeeSuccess: boolean = false;
  formData: FormGroup<any>;
  isAddingEmployee: any;
  isEditingEmployee: any;
  isModalOpen: boolean = true;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) {
    this.formData = this.formBuilder.group({
      employeeId: [''],
      department: [''],
      dateOfJoining: [''],
      personId: ['']
      // Add other form controls here
    });
  }

  ngOnInit(): void {
    if (this.selectedEmployee) {
      this.formData.patchValue({
        employeeId: this.selectedEmployee.employeeId,
        department: this.selectedEmployee.department,
        dateOfJoining: this.selectedEmployee.dateOfJoining,
        personId: this.selectedEmployee.personId,
      });
    }

    this.employeeService.employeeUpdate$.subscribe(() => {
      this.employeeService.getEmployees();
    });
  }
  onSubmit() {
    if (this.isEditMode) {
      this.editEmployee();
      // Emit the event
      // this.submitClicked.emit();
    } else {
      // this.addEmployee();
      this.addNewEmployee();
    }
  }

  addNewEmployee() {
    console.log({"addNewEmployee called": this.formData});
    const newEmployee: Employee = {
      employeeId: 0,
      department: this.formData.value.department,
      dateOfJoining: this.formData.value.dateOfJoining,
      personId: this.formData.value.personId,
      person: undefined,
      isSelected: false
    }
    // Logic to add a new employee
    this.employeeService.addNewEmployee(newEmployee).subscribe(
      (response) => {
        console.log('Employee added:', response);
        // Assuming 'response' contains the necessary info when adding is successful
        this.addEmployeeSuccess = true;
        this.submissionSuccess.emit();
        this.employeeService.notifyEmployeeUpdate();
        this.infoMessage = 'Employee added successfully';
        // Reset the form and close the modal
        this.resetForm();
      }
    );

  }
  addEmployee() {
    // Logic to add a new employee
    this.employeeService.addEmployee(this.formData.value).subscribe(
      (response) => {
        console.log('Employee added:', response.person?.firstName, response.person?.lastName);
        // Assuming 'response' contains the necessary info when adding is successful
        this.addEmployeeSuccess = true;
        this.submissionSuccess.emit();
        this.employeeService.notifyEmployeeUpdate();
        this.infoMessage = 'Employee added successfully';
        // Reset the form and close the modal
        this.resetForm();
      },
      (error) => {
        // Handle error response here
        if (error.status === 404) { // Assuming 404 status code for non-existing personId
          this.infoMessage = 'Person ID does not exist. Please use another Person ID.';
        } else {
          // Handle other types of errors
          this.infoMessage = 'Error occurred while adding employee: ' + error.message;
        }
        console.error('Error adding employee:', error);
      }
    );
  }

  resetForm() {
    this.formData.reset();
    this.isModalOpen = false;
    this.onCloseButtonClick();
  }

  addEmployee1() {
    // Logic to add a new employee
    this.employeeService.addEmployee(this.formData).subscribe((prsn) => {
      console.log('Employee added:', prsn.person?.firstName, prsn.person?.lastName);
      if (prsn) {
        this.addEmployeeSuccess = true;
        this.submissionSuccess.emit();
        this.employeeService.notifyEmployeeUpdate();
        this.onCloseButtonClick();
        this.infoMessage = 'Employee added successfully';
      }

      this.addEmployeeSuccess = true;
      this.submissionSuccess.emit();
      this.employeeService.notifyEmployeeUpdate();
      this.onCloseButtonClick();

      // Reset the form
      this.formData.reset();
      // Close the modal
      this.isModalOpen = false;
    });
  }
  editEmployee() {
    const updatedEmployee = this.formData.value;

    const updatedData: any = {
      employeeId: updatedEmployee.employeeId,
      personId: updatedEmployee.personId,
      department: updatedEmployee.department,
      dateOfJoining: updatedEmployee.dateOfJoining,
      isSelected: false
    };

    console.log('Updated data:', updatedData);

    this.employeeService.updateEmployee(updatedEmployee as Employee).subscribe(
      () => {
        this.addEmployeeSuccess = true;
        this.submissionSuccess.emit();
        console.log('Employee updated successfully');
        this.employeeService.notifyEmployeeUpdate();
        this.onCloseButtonClick();

        // Reset the form
        this.formData.reset();
        // Close the modal
        this.isModalOpen = false;
      },
      (error) => {
        console.error('Error updating employee:', error);
        this.onCloseButtonClick();
      }
    );
  }
  // Method to emit the event
  onCloseButtonClick(): void {
    this.closeForm.emit();
  }

}