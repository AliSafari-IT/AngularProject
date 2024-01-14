import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/Employee';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-addedit-employee-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule,ReactiveFormsModule],
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

  addEmployeeSuccess: boolean = false;
  formData: FormGroup<{ employeeId: FormControl<any>; department: FormControl<any>; dateOfJoining: FormControl<any>; personId: FormControl<any>; }>;
  isAddingEmployee: any;
  isEditingEmployee: any;
  isModalOpen: boolean = true;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.formData = this.fb.group({
      department: new FormControl('', Validators.required), // Add Validators.required
      dateOfJoining: new FormControl('', Validators.required), // Add Validators.required
      personId: new FormControl('', Validators.required), // Add Validators.required
      employeeId: new FormControl(''),
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
      this.addEmployee();
    }

  }
  addEmployee() {
    // Logic to add a new employee
    this.employeeService.addEmployee(this.formData).subscribe(() => {
      this.addEmployeeSuccess = true;
      this.submissionSuccess.emit();
      console.log('Employee added successfully');
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