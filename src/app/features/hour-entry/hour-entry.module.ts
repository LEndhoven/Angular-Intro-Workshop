import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TimeFormatPipeModule } from '../../shared/pipes/time-format-pipe.module';

import { DateSelectorModule } from './components/date-selector/date-selector.module';
import { ProjectEntryModule } from './components/project-entry/project-entry.module';
import { HourEntryComponent } from './hour-entry.component';
import { HourEntryService } from './services/hour-entry.service';

@NgModule({
  imports: [
    CommonModule,

    DateSelectorModule,
    ProjectEntryModule,

    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,

    TimeFormatPipeModule,
  ],
  exports: [HourEntryComponent],
  declarations: [HourEntryComponent],
  providers: [HourEntryService],
})
export class HourEntryModule {}
