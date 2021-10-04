import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HourEntryModule } from './hour-entry/hour-entry.module';

@NgModule({
  imports: [BrowserModule, FormsModule, HourEntryModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
