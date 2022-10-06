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
  public readonly dateControl = new FormControl<Date>(getDateOnly(new Date()));

  private readonly subscriptions = new Subscription();

  constructor(private readonly hourEntryService: HourEntryService) {}

  public ngOnInit(): void {
    this.subscriptions.add(this.initializeDateControl());
    this.subscriptions.add(this.updateServiceOnChanges());
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

  private initializeDateControl(): Subscription {
    return this.hourEntryService.currentDate$
      .pipe(take(1))
      .subscribe((currentDate) => {
        const dateCopy = getDateOnly(currentDate);
        this.dateControl.setValue(dateCopy, { emitEvent: false });
      });
  }

  private updateServiceOnChanges(): Subscription {
    return this.dateControl.value$.subscribe((currentDate) =>
      this.hourEntryService.updateCurrentDate(currentDate)
    );
  }
}

function getDateOnly(date: Date): Date {
  const dateCopy = new Date(date);
  dateCopy.setHours(0, 0, 0, 0);

  return dateCopy;
}

function addDays(date: Date, days: number): Date {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() + days);

  return dateCopy;
}
