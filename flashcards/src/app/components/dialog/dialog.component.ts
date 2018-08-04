import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserOptionsFormComponent } from '../user-options-form/user-options-form.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    let dialogRef = this.dialog.open(UserOptionsFormComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }
}
