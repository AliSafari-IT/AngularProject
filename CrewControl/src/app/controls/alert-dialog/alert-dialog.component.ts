import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent {
  actionName: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      message: string;
      type: string;
      okButtonText: string;
      cancelButtonText: string;
      onOkClick: () => void;
      onCancelClick: () => void;
    },
    private dialogRef: MatDialogRef<AlertDialogComponent>
  ) { }

  onCancelClick() {
    if(this.data.onCancelClick) {
      this.data.onCancelClick();
    }
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.onOkClick();
  }
}
