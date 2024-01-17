import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Person } from '../../models/Person';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from '../../Services/person.service';
import { NotificationsComponent } from "../../controls/notifications/notifications.component";
import { PersonsListComponent } from '../persons-list/persons-list.component';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  standalone: true,
  providers: [PersonService],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NotificationsComponent, PersonsListComponent],
})
export class PersonFormComponent implements OnInit {
onViewPersonDetails($event: Event) {
throw new Error('Method not implemented.');
}
  sharedService: SharedService | undefined;
  onEditPerson(person: Person) {
    this.selectedPerson = person;
    this.populateForm(person);
    this.isEditMode = true;
    this.isOpen = true;
    this.showPersonsList = false;
  }

  @Output() closeForm = new EventEmitter<void>();
  @Output() submissionSuccess = new EventEmitter<void>(); // New event emitter
  @Output() submitClicked = new EventEmitter<void>();
  @Input() isEditMode: boolean = false;
  @Input() isOpen: boolean = false;
  @Input() selectedPerson: Person | undefined;
  @Input() showPersonsList: boolean = false;

  personForm: FormGroup<{
    id: FormControl<any>;
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
    this.resetForm();
    this.resetNotifications();
    console.log("isOpen: " + this.isOpen);
  }
  constructor(private fb: FormBuilder, private personService: PersonService) {     // Initialize the form
    this.personForm = this.fb.group({
      id: [0],
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
    // Use app-person-form component to display the form with the person details
    this.sharedService?.selectedPerson$.subscribe(person => {
      if (person) {
        this.selectedPerson = person;
        this.populateForm(person);
        this.isOpen = true;
      }
    });
  }

  populateForm(person: Person): void {
    this.personForm.patchValue({
      id: person?.id || 0,
      firstName: person?.firstName,
      lastName: person?.lastName,
      age: person?.age || 0,
      gender: person?.gender,
      maritalStatus: person?.maritalStatus,
      address: person?.address,
      city: person?.city,
      state: person?.state,
      country: person?.country,
      email: person?.email,
      phoneNumber: person?.phoneNumber,
      dateOfBirth: person?.dateOfBirth  || Date.now().toLocaleString(),
    });
  }

  // Method to emit the event
  onCloseButtonClick(): void {
    this.closeForm.emit();
    this.isEditMode = false;
    this.selectedPerson = undefined;
    this.resetForm();
  }

  onSubmit() {
    if (!this.personForm?.valid) {
      this.submitClicked.emit();
      console.log("Form is not valid", this.personForm);
      return;
    }
  
    const personFormData = this.preparePersonData(this.personForm.value);
  
    if (this.isEditMode) {
      this.updatePerson(personFormData);
    } else {
      this.addPerson(personFormData);
    }
  
    this.submitClicked.emit();
  }
  
  preparePersonData(formData: any): Person {
    const personData = {...formData};
    if (!this.isEditMode) {
      personData.id = 0;
    }
    personData.dateOfBirth = new Date(personData.dateOfBirth).toISOString().slice(0, 10);
    return personData;
  }
  
  updatePerson(person: Person) {
    this.personService.putPerson(person).subscribe(response => {
      this.handleSuccessResponse(person.firstName + " " + person.lastName + " updated successfully!");
    }, error => this.handleError(error));
  }
  
  addPerson(person: Person) {
    this.personService.postPerson(person).subscribe(response => {
      this.handleSuccessResponse("Person added successfully!");
    }, error => this.handleError(error));
  }
  
  handleSuccessResponse(message: string) {
    this.infoMessage = message;
    this.addPersonSuccess = true;
    this.submissionSuccess.emit();
    this.closeFormAndReset();
  }
  
  handleError(error: any) {
    console.error(error);
    this.errorMessage = error.error;
    this.warningMessage = error.error;
  }
  
  closeFormAndReset() {
    this.onCloseButtonClick();
    this.isOpen = false;
    this.resetForm();
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