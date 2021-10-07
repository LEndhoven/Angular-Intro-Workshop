import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from 'ngx-typesafe-forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSelectorComponent implements OnInit, OnDestroy {
  @Output() public readonly currentDate = new EventEmitter<Date>();

  public readonly dateControl = new FormControl<Date>(new Date());

  private readonly subscriptions = new Subscription();

  public ngOnInit(): void {
    this.subscriptions.add(
      this.dateControl.value$.subscribe((currentDate) =>
        this.currentDate.emit(currentDate)
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
