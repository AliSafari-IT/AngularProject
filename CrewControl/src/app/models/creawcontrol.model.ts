export interface Employee {
  employeeId: number;
  personId: number;
  department: string;
  dateOfJoining: Date;
  // Include navigation properties if needed
  person?: Person;
}

export interface Person {
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
}
