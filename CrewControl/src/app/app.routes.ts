import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { ChangeLogContentComponent } from './pages/change-log/change-log-content/change-log-content.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

const routes: Routes = [
  { path: 'ChangeLog', component: ChangeLogContentComponent },
  { path: 'Home', component: HomePageComponent},
  { path: 'EmployeeList', component: EmployeesListComponent},
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }