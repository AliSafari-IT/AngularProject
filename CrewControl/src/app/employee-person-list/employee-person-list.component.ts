import { Component, NgModule, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { Person } from '../models/Person';
import { EmployeeService } from '../Services/employee.service';
import { NgFor, NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { AddEmployeeFormComponent } from "../add-employee-form/add-employee-form.component";
@Component({
    selector: 'app-employee-person-list',
    templateUrl: './employee-person-list.component.html',
    styleUrls: ['./employee-person-list.component.css'],
    standalone: true,
    imports: [NgFor, NgIf, AddEmployeeFormComponent]
})
export class EmployeePersonListComponent implements OnInit {

  employees: Employee[] = [];
  selectedEmployeePersonId: number | null = null;
  persons: Person[] = [];
  people: any[] = [];
  selectedPerson: any = null;
  searchTerm: any;
  now: number = Date.now();
  dateOfJoining: Date = new Date(this.now);
  showAddEmployeeForm: boolean = false;
  constructor(
    private employeeService: EmployeeService,
    //private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadPeople();
  }

  // Create (Add) an Employee
  addEmployee(): void {
    // Add the employee to the employees array
    this.employees.push({} as Employee);
  }
  
  toggleShowAddEmployeeForm() {
    this.showAddEmployeeForm = !this.showAddEmployeeForm;
    }

  // If person employed add its Employee object to its related person object then add it to people array
  addPersonToEmployee(employee: Employee): void {
    this.selectedPerson = this.persons.find(person => person.id === employee.personId);
    console.log("person: 1:", this.selectedPerson);
    this.selectedPerson.employees = this.selectedPerson.employees || [employee];
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

    console.log("People:", this.people);
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
}
