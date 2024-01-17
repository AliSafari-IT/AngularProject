import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule],
  providers: [EmployeeService],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
employees: any;
constructor(private employeeService: EmployeeService) {}
ngOnInit(): void {
  this.employeeService.getEmployees().subscribe(data => {
    this.employees = data;
  });
}
}
