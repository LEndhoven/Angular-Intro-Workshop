import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddProjectEntryComponent } from './add-project-entry.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [AddProjectEntryComponent],
  declarations: [AddProjectEntryComponent],
})
export class AddProjectEntryModule {}
