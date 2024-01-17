import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PersonService } from '../../Services/person.service';
import { Person } from '../../models/Person';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../controls/alert-dialog/alert-dialog.component';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from "../../controls/notifications/notifications.component";

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css'],
  providers: [PersonService],
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationsComponent]
})
export class PersonsListComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  @Input() isEditMode: boolean = false;
  @Input() isOpen: boolean = false;
  @Input() selectedPerson: Person | undefined;
  @Output() editPerson = new EventEmitter<Person>();
  @Output() deletePerson = new EventEmitter<Person>();
  @Output() viewPerson = new EventEmitter<Person>();
  @Input() showPersonsList= new EventEmitter<boolean>();

  persons: Person[] = [];
  searchResults: Person[] = [];
  allPersons: Person[] = [];
  displayedColumns: string[] = ['ID', 'First Name', 'Last Name', 'Email', 'Actions'];

  searchInput: string = '';
  infoMessage: any;
  successMessage: any;
  warningMessage: any;
  errorMessage: any;

  constructor(private personService: PersonService, private dialog: MatDialog) { }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onDeletePerson(prsn: Person) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete the selected person?',
        type: 'warning',
        okButtonText: 'OK',
        cancelButtonText: 'Cancel',
        onOkClick: () => {
          this.personService.deletePerson(prsn.id).subscribe(
            (data) => {
              this.dialog.closeAll();
              this.personService.notifyPersonUpdate();
              this.persons = this.persons.filter(p => p.id !== prsn.id);
              // Add info message about who was deleted
              this.successMessage = `${prsn.firstName} with ID ${prsn.id} was just deleted successfully from the database!`;
              // other messages become null
              this.infoMessage = null;
              this.warningMessage = null;
              this.errorMessage = null;
              console.log('Deleted successfully!');
            }
          )
        },
        onCancelClick: () => { this.dialog.closeAll(); },
      },
      panelClass: 'alert-dialog',
    });
    return;
  }
  onViewDetails(selectedPerson: Person) {
    throw new Error('Method not implemented.');
  }

  onEditPerson(selectedPerson: Person) {
    // TODO : Implement edit person dialog
    // Display a dialog with the person details and allow editing and saving changes
    // Use app-person-form component to display the form with the person details
    this.isEditMode = true;
    this.isOpen = true;
    this.selectedPerson = selectedPerson;
    // Emit an event or use a shared service to notify PersonFormComponent
    this.editPerson.emit(selectedPerson); // Assuming you have an EventEmitter
    this.showPersonsList.emit(false); // Emitting this event to close the person list and open the person form;
    this.resetNotifications();

    console.log('Edit person: ' + selectedPerson.id);
  }
  resetNotifications() {
    this.infoMessage = null;
    this.successMessage = null;
    this.warningMessage = null;
    this.errorMessage = null;
  }

  ngOnInit(): void {
    this.personService.getPersons().subscribe(
      (data: Person[]) => {
        this.persons = data;
        this.persons = this.persons.sort((a, b) => a.id - b.id);
        this.allPersons = this.persons;
        this.searchResults = this.persons;
      },

      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  searchPerson() {
    this.persons = this.allPersons;
    if (this.searchInput === '') {
      this.persons = this.allPersons;
      return;
    }
    this.searchResults = this.persons.filter((person) => {
      return person.firstName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        person.lastName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        person.email.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        person.id.toString().includes(this.searchInput);
    })
    this.persons = this.searchResults;
    if (this.persons.length === 0) {
      this.warningMessage = 'No results found.';
      // other messages become null
      this.infoMessage = null;
      this.successMessage = null;
      this.errorMessage = null;
    } else if (this.persons.length === 1) {
      this.infoMessage = 'Found 1 result.';
      this.warningMessage = null;
      this.successMessage = null;
      this.errorMessage = null;
    } else {
      this.infoMessage = 'Found ' + this.persons.length + ' results.';
      this.warningMessage = null;
      this.successMessage = null;
      this.errorMessage = null;
    }
  }

}
