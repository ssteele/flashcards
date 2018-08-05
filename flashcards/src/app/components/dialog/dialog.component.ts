import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserOptionsFormComponent } from '../user-options-form/user-options-form.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(UserOptionsFormComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog closed');
    });
  }
}
