import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@Component({
  selector: 'app-button-toggles',
  standalone: true,
  imports: [MatButtonToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './button-toggles.component.html',
  styleUrl: './button-toggles.component.css'
})
export class ButtonTogglesComponent {
  fontStyleControl = new FormControl('');

}
