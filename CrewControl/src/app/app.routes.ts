import { EmployeesListComponent } from "./components/employees-list/employees-list.component";
import { MuiExamplesComponent } from "./components/materialui/mui-examples/mui-examples.component";
import { AboutPageComponent } from "./pages/about/about-page.component";
import { ChangeLogContentComponent } from "./pages/change-log/change-log-content.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { HomePageComponent } from "./pages/home/home-page.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";



export const routes = [
  { path: 'change-log', component: ChangeLogContentComponent },
  { path: 'home', component: HomePageComponent },
   { path: 'about', component: AboutPageComponent}, 
   { path: 'contact', component: ContactComponent},
  { path: 'employees-list', component: EmployeesListComponent },
  { path: 'material/components', component: MuiExamplesComponent },
  { path: '**', component: NotFoundComponent }
];
