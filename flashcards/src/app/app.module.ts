import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './components/app.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';
import { UserOptionsFormComponent } from './components/user-options-form/user-options-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardsComponent,
    UserOptionsFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  entryComponents: [UserOptionsFormComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
