import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateSelectorModule } from './components/date-selector/date-selector.module';
import { HourEntryComponent } from './hour-entry.component';
import { HourEntryService } from './services/hour-entry.service';

@NgModule({
  imports: [CommonModule, DateSelectorModule],
  exports: [HourEntryComponent],
  declarations: [HourEntryComponent],
  providers: [
    HourEntryService,
  ],
})
export class HourEntryModule {}
