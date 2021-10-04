import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DateSelectorComponent } from './date-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  exports: [DateSelectorComponent],
  declarations: [DateSelectorComponent],
})
export class DateSelectorModule {}
