import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from "../card/card.component";
import { ButtonTogglesComponent } from "../button-toggles/button-toggles.component";

@Component({
    selector: 'app-mui-examples',
    standalone: true,
    templateUrl: './mui-examples.component.html',
    styleUrl: './mui-examples.component.css',
    imports: [MatCardModule, CardComponent, ButtonTogglesComponent]
})
export class MuiExamplesComponent {

}
