import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgFor , NgForOf} from '@angular/common'; 

@NgModule({
    imports: [ CommonModule, NgFor, NgForOf
    ],
    providers: [],
    declarations: [
        AppComponent, EmployeesListComponent
    ],
    
    bootstrap: [AppComponent]
})
export class AppModule { }
