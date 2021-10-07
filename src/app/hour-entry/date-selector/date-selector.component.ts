import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from 'ngx-typesafe-forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSelectorComponent {
  public readonly dateControl = new FormControl<DateTime>(DateTime.local());
}
