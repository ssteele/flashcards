import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

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
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [UserOptionsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
