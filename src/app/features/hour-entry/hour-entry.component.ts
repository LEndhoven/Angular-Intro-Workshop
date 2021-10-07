import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hour-entry',
  templateUrl: './hour-entry.component.html',
  styleUrls: ['./hour-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourEntryComponent {}
