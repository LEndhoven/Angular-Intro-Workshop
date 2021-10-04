import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateSelectorModule } from './date-selector/date-selector.module';
import { HourEntryComponent } from './hour-entry.component';

@NgModule({
  imports: [CommonModule, DateSelectorModule],
  exports: [HourEntryComponent],
  declarations: [HourEntryComponent],
})
export class HourEntryModule {}
