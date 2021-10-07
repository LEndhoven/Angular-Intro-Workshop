import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Memoized } from '../../../shared/decorators';
import { ProjectEntry } from '../models';

@Injectable()
export class HourEntryService {
  private readonly currentDateSubject = new BehaviorSubject<Date>(new Date());
  private readonly projectEntriesByDateSubject = new BehaviorSubject<
    Map<Date, ProjectEntry[]>
  >(new Map<Date, ProjectEntry[]>());

  @Memoized public get currentDate$(): Observable<Date> {
    return this.currentDateSubject.asObservable();
  }

  @Memoized public get currentProjectEntries$(): Observable<ProjectEntry[]> {
    return combineLatest([
      this.currentDate$,
      this.projectEntriesByDateSubject,
    ]).pipe(
      map(
        ([currentDate, projectEntriesByDate]) =>
          projectEntriesByDate.get(currentDate) ?? ([] as ProjectEntry[])
      )
    );
  }

  public updateCurrentDate(newCurrentDate: Date): void {
    this.currentDateSubject.next(newCurrentDate);
  }

  public addEmptyProjectEntry(date: Date, index: number): void {
    const currentProjectEntriesByDate = new Map(
      this.projectEntriesByDateSubject.getValue()
    );
    const currentProjectEntries =
      [...currentProjectEntriesByDate.get(date)] ?? ([] as ProjectEntry[]);
    const usedIndex =
      index > currentProjectEntries.length
        ? currentProjectEntries.length
        : index < 0
        ? 0
        : index;

    currentProjectEntries.splice(usedIndex, 0, { date });
    currentProjectEntriesByDate.set(date, currentProjectEntries);

    this.projectEntriesByDateSubject.next(currentProjectEntriesByDate);
  }

  public removeProjectEntry(projectEntry: ProjectEntry): void {
    const currentProjectEntriesByDate = new Map(
      this.projectEntriesByDateSubject.getValue()
    );
    const currentProjectEntries = [
      ...currentProjectEntriesByDate.get(projectEntry.date),
    ];

    const entryIndex = currentProjectEntries.indexOf(projectEntry);

    if (entryIndex < 0) {
      return;
    }

    currentProjectEntries.splice(entryIndex, 1);
    currentProjectEntriesByDate.set(projectEntry.date, currentProjectEntries);

    this.projectEntriesByDateSubject.next(currentProjectEntriesByDate);
  }
}
