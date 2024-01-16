import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotificationsComponent } from "../../../controls/notifications/notifications.component";

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: [MatCardModule, MatButtonModule, NotificationsComponent]
})
export class CardComponent {
    infoMessage: string | undefined;
    warningMessage: string | undefined;
    shared() {
        this.infoMessage = "Card shared";
        this.warningMessage = undefined;
    }
    liked() {
        this.warningMessage = "Card liked";
        this.infoMessage = undefined;
    }

}
