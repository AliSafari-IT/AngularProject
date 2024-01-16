import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../Services/person.service';
import { Person } from '../../models/Person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css'],
  providers: [PersonService],
  imports: [CommonModule],
  standalone: true,
})
export class PersonsListComponent implements OnInit {
onViewDetails(_t13: Person) {
throw new Error('Method not implemented.');
}
onDelete(_t13: Person) {
  this.personService.deletePerson(_t13.id).subscribe(
    () => {
      this.persons = this.persons.filter((p) => p.id !== _t13.id);
    }
  )
}
onEdit(_t13: Person) {
throw new Error('Method not implemented.');
}
  persons: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPersons().subscribe(
      (data: Person[]) => {
        this.persons = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
}
