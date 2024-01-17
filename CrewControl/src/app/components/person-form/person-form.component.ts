import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Person } from '../../models/Person';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from '../../Services/person.service';
import { NotificationsComponent } from "../../controls/notifications/notifications.component";
import { PersonsListComponent } from '../persons-list/persons-list.component';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  standalone: true,
  providers: [PersonService],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NotificationsComponent, PersonsListComponent],
})
export class PersonFormComponent implements OnInit {

  @Output() closeForm = new EventEmitter<void>();
  @Output() submissionSuccess = new EventEmitter<void>(); // New event emitter
  @Output() submitClicked = new EventEmitter<void>();
  @Input() isEditMode: boolean = false;
  @Input() isOpen: boolean = false;
  @Input() selectedPerson: Person | undefined;
  @Input() showPersonsList: boolean = false;

  personForm: FormGroup<{
    firstName: FormControl<any>;
    lastName: FormControl<any>;
    age: FormControl<any>;
    gender: FormControl<any>;
    maritalStatus: FormControl<any>;
    address: FormControl<any>;
    city: FormControl<any>;
    state: FormControl<any>;
    country: FormControl<any>;
    email: FormControl<any>;
    phoneNumber: FormControl<any>;
    dateOfBirth: FormControl<any>;
  }>;

  person: Person | undefined;
  addPersonSuccess: boolean = false;
  
  infoMessage: any;
  successMessage: any;
  warningMessage: any;
  errorMessage: any;
  toggleForm() {
    this.isOpen = !this.isOpen;
    this.showPersonsList = false;
    this.resetNotifications();
    console.log("isOpen: " + this.isOpen);
  }
  constructor(private fb: FormBuilder, private personService: PersonService) {     // Initialize the form
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  showPersons() {
    this.showPersonsList = !this.showPersonsList;
    this.isOpen = false;
    this.resetNotifications();
  }

  ngOnInit(): void {

  }

  // Method to emit the event
  onCloseButtonClick(): void {
    this.closeForm.emit();
    this.isEditMode = false;
    this.selectedPerson = undefined;
    this.resetForm();
  }

  onSubmit() {
    // Check if the form is valid
    if (this.personForm?.valid) {
      // Logic to add a new employee
      this.personService.postPerson(this.personForm.value).subscribe((response) => {
        // Handle the response from the API
        this.infoMessage = "Person added successfully!";
        this.addPersonSuccess = true;
        this.submissionSuccess.emit();
        console.log('Employee added successfully');
        this.personService.notifyPersonUpdate();
        this.onCloseButtonClick();
        this.isOpen = false;
        // Reset the form
        this.resetForm();
        // Handle the response from the API
        console.log(response);
      }, error => {
        // Handle any errors that occur during the API call
        console.error(error);
        this.errorMessage = error.error;
        this.warningMessage = error.error;
      });

      // Emit the event
      this.submitClicked.emit();
    }
  }

  onCancel() {
    this.toggleForm();
  }

  // Reset the form
  resetForm() {
    this.personForm.reset();
  }

  // Reset the notifications messages
  resetNotifications() {
    this.infoMessage = null;
    this.successMessage = null;
    this.warningMessage = null;
    this.errorMessage = null;
  }
}