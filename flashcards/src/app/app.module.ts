import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './components/app.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { UserOptionsComponent } from './components/user-options/user-options.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardsComponent,
    DialogComponent,
    UserOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule
  ],
  entryComponents: [UserOptionsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
