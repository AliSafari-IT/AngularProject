import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { Person } from '../models/Person';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = 'https://localhost:44354/api/Employees';
  private personsUrl = 'https://localhost:44354/api/Persons';

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl);
  }

  getPerson(id: number): Observable<Person> {
    const url = `${this.personsUrl}/${id}`;
    return this.http.get<Person>(url);
  }
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl);
  }

  getEmployeesByPersonId(personId: number): Observable<Employee[]> {
    const url = `${this.employeesUrl}/person/${personId}`;
    return this.http.get<Employee[]>(url);
  }

  getPersonsById(personId: number): Observable<any> {
    const url = `${this.personsUrl}/${personId}`;
    return this.http.get<any>(url);
  }

  addEmployee(employee: FormGroup): Observable<Employee> {
    const params = new HttpParams()
      .set('personId', employee.value.personId)
      .set('department', employee.value.department)
      .set('dateOfJoining', employee.value.dateOfJoining);
  
    return this.http.post<Employee>(this.employeesUrl, null, { params });
  }

}
