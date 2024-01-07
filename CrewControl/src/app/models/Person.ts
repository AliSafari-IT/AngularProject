import { IPerson } from "../interfaces/person";

export class Person implements IPerson {
    [x: string]: any;
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    city: string;
    state: string;
    country: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
  
    constructor(id: number, firstName: string, lastName: string, age: number, address: string, city: string, state: string, country: string, email: string, phoneNumber: string, dateOfBirth: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.address = address;
      this.city = city;
      this.state = state;
      this.country = country;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.dateOfBirth = new Date(dateOfBirth);
    }
    }