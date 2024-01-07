import { IEmployee } from "../interfaces/employee";
import { Person } from "./Person";

export class Employee implements IEmployee {
    employeeId: number;
    personId: number;
    person: null | Person; 
    department: string;
    dateOfJoining: Date;
    isSelected: boolean;

    constructor(employeeId: number, personId: number, person: null | Person, department: string, dateOfJoining: string, isSelected: boolean) {
        this.employeeId = employeeId;
        this.personId = personId;
        this.person = person;
        this.department = department;
        this.dateOfJoining = new Date(dateOfJoining);
        this.isSelected = isSelected;
    }
}
