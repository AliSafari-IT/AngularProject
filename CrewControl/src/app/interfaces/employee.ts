import { Person } from "../models/Person";

export interface IEmployee {
  employeeId: number;
  personId: number;
  person: null | Person; 
  department: string;
  dateOfJoining: Date; 
  isSelected: boolean;
}
