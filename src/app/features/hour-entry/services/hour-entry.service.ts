import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { Memoized } from '../../../shared/decorators';
import { generateGuid } from '../../../shared/utils';
import { Project, ProjectEntry } from '../models';

const AVAILABLE_PROJECTS: Project[] = [
  { name: 'General Development Scheme', code: 'GENDS', color: 'blue' },
  { name: 'General Meetings', code: 'GENME', color: 'grey' },
  { name: 'Awesome Workshop', code: 'AWORK', color: 'green' },
  { name: 'Project 1', code: 'PROJ1', color: 'purple' },
];

@Injectable()
export class HourEntryService {
  private readonly currentDateSubject = new BehaviorSubject<Date>(new Date());
  private readonly projectEntriesByDateSubject = new BehaviorSubject<
    Map<number, ProjectEntry[]>
  >(new Map<number, ProjectEntry[]>());

  @Memoized public get currentDate$(): Observable<Date> {
    return this.currentDateSubject.asObservable();
  }

  @Memoized public get availableProjects$(): Observable<Project[]> {
    return of(AVAILABLE_PROJECTS); // Redundant Observable flow, only used to mimic a server call setup
  }

  @Memoized public get currentProjectEntries$(): Observable<ProjectEntry[]> {
    return combineLatest([
      this.currentDate$,
      this.projectEntriesByDateSubject,
    ]).pipe(
      map(
        ([currentDate, projectEntriesByDate]) =>
          projectEntriesByDate.get(currentDate.getTime()) ??
          ([] as ProjectEntry[])
      )
    );
  }

  public updateCurrentDate(newCurrentDate: Date): void {
    this.currentDateSubject.next(newCurrentDate);
  }

  public updateProjectEntry(projectEntry: ProjectEntry): void {
    const currentProjectEntriesByDate = new Map(
      this.projectEntriesByDateSubject.getValue()
    );

    const currentProjectEntries = [
      ...(currentProjectEntriesByDate.get(projectEntry.date.getTime()) ??
        ([] as ProjectEntry[])),
    ];

    const usedIndex = currentProjectEntries.findIndex(
      ({ id }) => id === projectEntry.id
    );

    if (usedIndex < 0) {
      return;
    }

    currentProjectEntries.splice(usedIndex, 1, projectEntry);
    currentProjectEntriesByDate.set(
      projectEntry.date.getTime(),
      currentProjectEntries
    );

    this.projectEntriesByDateSubject.next(currentProjectEntriesByDate);
  }

  public addEmptyProjectEntry(date: Date, index: number): void {
    const currentProjectEntriesByDate = new Map(
      this.projectEntriesByDateSubject.getValue()
    );

    const currentProjectEntries = [
      ...(currentProjectEntriesByDate.get(date.getTime()) ??
        ([] as ProjectEntry[])),
    ];
    const usedIndex =
      index > currentProjectEntries.length
        ? currentProjectEntries.length
        : index < 0
        ? 0
        : index;

    currentProjectEntries.splice(usedIndex, 0, { id: generateGuid(), date });
    currentProjectEntriesByDate.set(date.getTime(), currentProjectEntries);

    this.projectEntriesByDateSubject.next(currentProjectEntriesByDate);
  }

  public removeProjectEntry(projectEntry: ProjectEntry): void {
    const currentProjectEntriesByDate = new Map(
      this.projectEntriesByDateSubject.getValue()
    );
    const currentProjectEntries = [
      ...(currentProjectEntriesByDate.get(projectEntry.date.getTime()) ??
        ([] as ProjectEntry[])),
    ];

    const entryIndex = currentProjectEntries.indexOf(projectEntry);

    if (entryIndex < 0) {
      return;
    }

    currentProjectEntries.splice(entryIndex, 1);
    currentProjectEntriesByDate.set(
      projectEntry.date.getTime(),
      currentProjectEntries
    );

    this.projectEntriesByDateSubject.next(currentProjectEntriesByDate);
  }
}
