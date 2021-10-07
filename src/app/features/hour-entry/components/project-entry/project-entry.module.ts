import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ProjectEntryComponent } from './project-entry.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  exports: [ProjectEntryComponent],
  declarations: [ProjectEntryComponent],
})
export class ProjectEntryModule {}
