import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Person } from '../models/Person';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private personUpdateSource = new Subject<void>();
  employeeUpdate$ = this.personUpdateSource.asObservable();

  notifyPersonUpdate() {
    this.personUpdateSource.next();
  }

  private employeesUrl = 'https://localhost:44354/api/Employees';
  private personsUrl = 'https://localhost:44354/api/Persons';

  constructor(private http: HttpClient) { }
  getPerson(id: number): Observable<Person> {
    const url = `${this.personsUrl}/${id}`;
    return this.http.get<Person>(url);
  }
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl);
  }
  addPerson(person: FormGroup): Observable<Person> {
    const params = new HttpParams()
      .set('firstName', person.value.firstName)
      .set('lastName', person.value.lastName)
      .set('age', person.value.age)
      .set('address', person.value.address)
      .set('city', person.value.city)
      .set('state', person.value.state)
      .set('country', person.value.country)
      .set('email', person.value.email)
      .set('phoneNumber', person.value.phoneNumber)
      .set('dateOfBirth', person.value.dateOfBirth);

    return this.http.post<Person>(this.personsUrl, null, { params });
  }

  postPerson(person: any): Observable<Person> {
    return this.http.post<Person>(this.personsUrl, person);
  }

  deletePerson(id: number): Observable<Person> {
    const url = `${this.personsUrl}/${id}`;
    return this.http.delete<Person>(url);
  }

  putPerson(person: Person): Observable<Person> {
    const url = `${this.personsUrl}/${person.id}`;
    return this.http.put<Person>(url, person);
  }
}
