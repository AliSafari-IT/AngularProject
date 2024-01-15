import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './Services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { NavItem } from './interfaces/navItem';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EmployeeService,],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ]
})

export class AppComponent implements OnInit {
  employees: any = [];
  navItems: NavItem[] = [
    { title: 'Home', route: '/home', active: false },
    { title: 'Recent Changes', route: '/change-log', active: false },
    { title: 'Employee List', route: '/employees-list', active: false },
    { title: 'Material-UI', route: '/material/components', active: false },
    { title: 'About', route: '/about', active: false },
    { title: 'Contact', route: '/contact', active: false },
    { title: 'Contact Lazy', route: '/contactlazy', active: false },
  ];
  
  constructor(private employeeService: EmployeeService, private router: Router) { }

  toggleActive(item: any) {
    this.navItems = this.navItems.map((x: any) => {
      x.active = false;
      return x;
    });
    item.active = true;
    this.router.navigate([item.route]);
  }


  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }
  title = 'FullstackAppWithAngularAndDotNetCoreApi';
}
