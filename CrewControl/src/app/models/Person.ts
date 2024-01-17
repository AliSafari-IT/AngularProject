import { IPerson } from "../interfaces/person";

export class Person implements IPerson {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    maritalStatus: string;
    address: string;
    city: string;
    state: string;
    country: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
  
    constructor(id: number , firstName: string, lastName: string, age: number, gender: string, maritalStatus: string,
       address: string, city: string, state: string, country: string, email: string, phoneNumber: string, dateOfBirth: string) {
      this.id = id || 0;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.gender = gender;
      this.maritalStatus = maritalStatus;
      this.address = address;
      this.city = city;
      this.state = state;
      this.country = country;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.dateOfBirth = new Date(dateOfBirth);
    }
    }