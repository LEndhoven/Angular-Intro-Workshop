import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProjectEntryComponent } from './project-entry.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ProjectEntryComponent,
  ],
  declarations: [
    ProjectEntryComponent,
  ],
})
export class ProjectEntryModule { }
