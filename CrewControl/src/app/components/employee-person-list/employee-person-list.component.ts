import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { Person } from '../../models/Person';
import { EmployeeService } from '../../Services/employee.service';
import { AddEditEmployeeFormComponent } from "../addedit-employee-form/addedit-employee-form.component";
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from '../../controls/notifications/notifications.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-person-list',
  templateUrl: './employee-person-list.component.html',
  styleUrls: ['./employee-person-list.component.css'],
  standalone: true,
  imports: [ CommonModule, AddEditEmployeeFormComponent, FormsModule,NotificationsComponent],
  providers: [],
  schemas: [],
})
export class EmployeePersonListComponent implements OnInit {
  allEmployees: Employee[] = [];
  employees: Employee[] = [];
  selectedEmployeePersonId: number | null = null;
  persons: Person[] = [];
  people: any[] = [];
  selectedPerson: any = null;
  searchTerm: any;
  now: number = Date.now();
  dateOfJoining: Date = new Date(this.now);
  showAddEmployeeForm: boolean = false;
  closeForm: any;
  successMessage: any;
  errorMessage: any;
  warningMessage: any;
  infoMessageHtml: any;
  infoMessage: any;
  isAdding: boolean = false;
  isEditing: boolean = false;
  selectedEmployee: Employee | undefined;
  constructor(
    private employeeService: EmployeeService,
    //private personService: PersonService
  ) { }

  onEmployeeSelected(employee: Employee) {
    this.selectedEmployee = employee;
  }

  searchEmployees() {
    if (this.searchTerm) {
      const searchInputLowerCase = this.searchTerm.toLowerCase();
      this.employees = this.allEmployees.filter(employee => {
        // Convert employeeId to string and check if it includes the search input
        const idMatch = employee.employeeId.toString().includes(this.searchTerm);

        // Check if department (converted to lowercase) includes the search input
        const departmentMatch = employee.department?.toLowerCase().includes(searchInputLowerCase);

        // Return true if either idMatch or departmentMatch is true
        return idMatch || departmentMatch;
      });

      // Update infoMessage based on the number of filtered employees
      if (this.employees.length > 0) {
        const message = document.createElement('div');
        message.textContent = `Found ${this.employees.length} employees.`;
        this.infoMessage = message;
      } else {
        const message = document.createElement('div');
        message.textContent = 'No employees found.';
        this.infoMessage = message;
      }
    } else {
      this.employees = [...this.allEmployees];
      this.setEmptyDivTag();
      ; // Reset the info message when there's no search input
    }
  }


  ngOnInit(): void {
    this.loadEmployees();
    this.loadPeople();
    this.employeeService.employeeUpdate$.subscribe(() => {
      this.loadEmployees();
      this.loadPeople();
    });

  }

  // Create (Add) an Employee
  addEmployee(): void {
    // Add the employee to the employees array
    this.employees.push({} as Employee);
  }

  toggleShowAddEmployeeForm() {
    this.isAdding = true;
    this.showAddEmployeeForm = !this.showAddEmployeeForm;
  }

  // If person employed add its Employee object to its related person object then add it to people array
  addPersonToEmployee(employee: Employee): void {
    this.selectedPerson = this.persons.find(person => person.id === employee.personId);
    console.log("person: 1:", this.selectedPerson);
    // Get employees belonging to the selected person
    const employeesBelongingToSelectedPerson = this.employees.filter(employee => employee.personId === this.selectedPerson.id);
    // Add employeesBelongingToSelectedPerson to the selected person's employees array
    this.selectedPerson.employees = employeesBelongingToSelectedPerson;
    console.log("person: 2:", this.selectedPerson);

    if (!this.selectedPerson) {
      console.error("Person not found.");
      return;
    }

    if (!this.selectedPerson.employees || !Array.isArray(this.selectedPerson.employees)) {
      console.error("Invalid 'employees' property in person object.");
      return;
    }

    // Cache the Set or Map instance for faster lookup and insertion
    const peopleSet: Set<any> = new Set();
    peopleSet.add(this.selectedPerson);
    this.people = Array.from(peopleSet);

    const dummyElement = document.createElement('div');
    dummyElement.innerHTML = this.people.map((person: any) => "<div><h4><strong>" + person.firstName + " " + person.lastName + "</strong> is an employee of the following department(s): </h4><ul>" + person.employees.map((employee: any) => "<li>" + employee.department + " since " + employee.dateOfJoining).join("</li>")).join("</ul> </div>");
    this.infoMessageHtml = dummyElement;
    console.log("infoMessageHtml:", this.infoMessageHtml);
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  loadPeople(): void {
    this.employeeService.getPersons().subscribe(persons => this.persons = persons);
  }

  onEmployeeSelect(personId: number, employee: Employee): void {
    this.selectedEmployeePersonId = personId;

    this.loadPersonsForEmployee(personId, employee);
    console.log("Selected employee:", this.selectedEmployeePersonId);
    console.log("Employees:", this.employees);
    console.log("Persons:", this.persons);
    console.log("People:", this.people);

  }

  loadPersonsForEmployee(personId: number, employee: Employee): void {
    // Assuming your PersonService has a method to get persons by employee ID
    this.persons.filter(person => person.id === this.selectedEmployeePersonId);
    this.addPersonToEmployee(employee);
    console.log("Persons for employee:", this.persons);
  }

  trackById(index: number, employee: Employee): number {
    return employee.employeeId;
  }

  // set infoMessage to '' when no employees are selected
  setEmptyDivTag(): void {
    this.infoMessage = document.createElement('div');
    this.infoMessage.textContent = '';
  }

  refreshTableData(): void {
    this.employeeService.notifyEmployeeUpdate();
  }
  
  onCloseButtonClick() {
    this.isEditing = false;
    this.showAddEmployeeForm = false;
    this.employees = this.employees.map(employee => ({ ...employee, isSelected: false }));
  }
}
