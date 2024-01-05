import { Component, OnInit } from '@angular/core';
import { Employee, Person } from '../models/creawcontrol.model';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'person-employee-lists',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  public persons: Person[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 30, address: '123 Main St', city: 'Anytown', state: 'State', country: 'Country', email: 'john.doe@example.com', phoneNumber: '123-456-7890', dateOfBirth: new Date('1992-01-01') },
    { id: 2, firstName: 'Jane', lastName: 'Doe', age: 28, address: '456 Elm St', city: 'Othertown', state: 'State', country: 'Country', email: 'jane.doe@example.com', phoneNumber: '234-567-8901', dateOfBirth: new Date('1994-02-02') },
    { id: 3, firstName: 'Alice', lastName: 'Smith', age: 35, address: '789 Oak St', city: 'Thistown', state: 'State', country: 'Country', email: 'alice.smith@example.com', phoneNumber: '345-678-9012', dateOfBirth: new Date('1987-03-03') },
    { id: 4, firstName: 'Bob', lastName: 'Johnson', age: 40, address: '101 Pine St', city: 'Thatown', state: 'State', country: 'Country', email: 'bob.johnson@example.com', phoneNumber: '456-789-0123', dateOfBirth: new Date('1982-04-04') },
    { id: 5, firstName: 'Carol', lastName: 'Williams', age: 32, address: '202 Birch St', city: 'Heretown', state: 'State', country: 'Country', email: 'carol.williams@example.com', phoneNumber: '567-890-1234', dateOfBirth: new Date('1990-05-05') }
  ];
  employees: Employee[] = [
    { employeeId: 101, personId: 1, department: 'Engineering', dateOfJoining: new Date('2020-06-01'), person: this.persons[0] },
    { employeeId: 102, personId: 3, department: 'Marketing', dateOfJoining: new Date('2021-07-15'), person: this.persons[2] }
  ];

  constructor() { }

  ngOnInit(): void {
    // If fetching data from a service, do it here
  }
}
