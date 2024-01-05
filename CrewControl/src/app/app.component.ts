import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [ CommonModule, 
    AddEmployeeComponent, 
    EditEmployeeComponent,
    EmployeesListComponent,
    Router,
    HomeComponent,
    Event,
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CrewControl';
  constructor(private router: Router) {}

  // Method to handle the click event
  HomeClick() {
    this.router.navigate(['/']); // Navigate to the home route
  }
}
