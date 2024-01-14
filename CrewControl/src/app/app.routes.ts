import { EmployeesListComponent } from "./components/employees-list/employees-list.component";
import { AboutPageComponent } from "./pages/about/about-page.component";
import { ChangeLogContentComponent } from "./pages/change-log/change-log-content.component";
import { HomePageComponent } from "./pages/home/home-page.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";


export const routes = [
  { path: 'change-log', component: ChangeLogContentComponent },
  { path: 'home', component: HomePageComponent},
  { path: 'about', component: AboutPageComponent}, 
  { path: 'employees-list', component: EmployeesListComponent},
  { path: '**', component: NotFoundComponent }
];
