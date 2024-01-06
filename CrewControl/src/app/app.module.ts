import { NgModule } from '@angular/core';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // Define your routes here
  ];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [
        EmployeesListComponent,
    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }
