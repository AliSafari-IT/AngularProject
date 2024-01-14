import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  imports: [CommonModule],

})
export class NotificationsComponent {
  @Input() successMessage: string | undefined;
  @Input() warningMessage: string | undefined;
  @Input() errorMessage: string | undefined;
  @Input() infoMessageHtml: any;
  @Input() infoMessage: string | undefined;
}