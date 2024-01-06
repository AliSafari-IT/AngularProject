import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [RouterModule ],
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
