import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private selectedPersonSource = new BehaviorSubject<Person | null>(null);
  selectedPerson$ = this.selectedPersonSource.asObservable();
  
  selectPersonForEdit(person: Person) {
    this.selectedPersonSource.next(person);
  }
}
