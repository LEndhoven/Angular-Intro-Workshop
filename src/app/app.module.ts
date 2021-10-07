import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HourEntryModule } from './features/hour-entry/hour-entry.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MatNativeDateModule,

    HourEntryModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AppModule {}
