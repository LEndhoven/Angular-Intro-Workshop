import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Memoized } from '../../../shared/decorators';

@Injectable()
export class HourEntryService {
  private readonly currentDateSubject = new BehaviorSubject<Date>(new Date());

  @Memoized public get currentDate$(): Observable<Date> {
    return this.currentDateSubject.asObservable();
  }

  public updateCurrentDate(newCurrentDate: Date): void {
    this.currentDateSubject.next(newCurrentDate);
  }
}
