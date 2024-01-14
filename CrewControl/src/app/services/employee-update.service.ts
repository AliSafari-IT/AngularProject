import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeUpdateService {
  private employeeUpdateSource = new Subject<void>();

  employeeUpdate$ = this.employeeUpdateSource.asObservable();

  notifyEmployeeUpdate() {
    this.employeeUpdateSource.next();
  }
}
