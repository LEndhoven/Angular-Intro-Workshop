import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateSelectorComponent } from './date-selector.component';

@NgModule({
  imports: [CommonModule],
  exports: [DateSelectorComponent],
  declarations: [DateSelectorComponent],
})
export class DateSelectorModule {}
