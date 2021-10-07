import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from 'ngx-typesafe-forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { HourEntryService } from '../../services/hour-entry.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSelectorComponent implements OnInit, OnDestroy {
  public readonly dateControl = new FormControl<Date>(new Date());

  private readonly subscriptions = new Subscription();

  constructor(private readonly hourEntryService: HourEntryService) {}

  public ngOnInit(): void {
    this.subscriptions.add(
      this.hourEntryService.currentDate$
        .pipe(take(1))
        .subscribe((currentDate) =>
          this.dateControl.setValue(currentDate, { emitEvent: false })
        )
    );

    this.subscriptions.add(
      this.dateControl.value$.subscribe((currentDate) =>
        this.hourEntryService.updateCurrentDate(currentDate)
      )
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public goToPreviousDay(): void {
    const currentDate = this.dateControl.value;
    const newDate = addDays(currentDate, -1);
    this.dateControl.setValue(newDate);
  }

  public goToNextDay(): void {
    const currentDate = this.dateControl.value;
    const newDate = addDays(currentDate, 1);
    this.dateControl.setValue(newDate);
  }
}

function addDays(date: Date, days: number): Date {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() + days);

  return dateCopy;
}
