import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectEntryComponent } from './project-entry.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ProjectEntryComponent],
  declarations: [ProjectEntryComponent],
})
export class ProjectEntryModule {}
