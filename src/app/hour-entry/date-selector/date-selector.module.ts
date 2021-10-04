import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { DateSelectorComponent } from './date-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // MatDatepickerModule,
    // MatFormFieldModule,
  ],
  exports: [DateSelectorComponent],
  declarations: [DateSelectorComponent],
})
export class DateSelectorModule {}
