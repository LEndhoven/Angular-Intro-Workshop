import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { filter, map, Observable, Subscription, withLatestFrom } from 'rxjs';
import { cache } from '../../shared/rxjs-utils';
import { Memoized } from '../../shared/decorators';
import {
  convertTimeExpressinToMinutes,
  isValidTimeDuration,
} from '../../shared/utils';
import { ProjectEntry } from './models';
import { HourEntryService } from './services/hour-entry.service';

interface ProjectEntryViewModel {
  projectEntry: ProjectEntry;
  cssClass: string | undefined;
}

const PROJECT_CODE_TO_CLASS = new Map<string, string>([
  ['GENDS', 'is-gends'],
  ['AWORK', 'is-awesome-workshop'],
]);

@Component({
  selector: 'app-hour-entry',
  templateUrl: './hour-entry.component.html',
  styleUrls: ['./hour-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourEntryComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  constructor(private readonly hourEntryService: HourEntryService) {}

  @Memoized public get projectEntryViewModels$(): Observable<
    ProjectEntryViewModel[]
  > {
    return this.hourEntryService.currentProjectEntries$.pipe(
      map((projectEntries) =>
        projectEntries.map((projectEntry) => ({
          projectEntry,
          cssClass: PROJECT_CODE_TO_CLASS.get(projectEntry.projectCode),
        }))
      ),
      cache()
    );
  }

  @Memoized public get totalTimeInMinutes$(): Observable<number> {
    return this.projectEntryViewModels$.pipe(
      map((projectEntries) =>
        projectEntries
          .filter(
            ({ projectEntry }) =>
              projectEntry.timeSpent !== undefined &&
              isValidTimeDuration(projectEntry.timeSpent)
          )
          .reduce(
            (totalMinutes, projectEntryViewModel) =>
              totalMinutes +
              convertTimeExpressinToMinutes(
                projectEntryViewModel.projectEntry.timeSpent
              ),
            0
          )
      ),
      cache()
    );
  }

  public ngOnInit(): void {
    // Ensure always one entry is visible
    this.subscriptions.add(
      this.hourEntryService.currentDate$
        .pipe(
          withLatestFrom(this.projectEntryViewModels$),
          filter(([_, projectEntries]) => projectEntries.length === 0)
        )
        .subscribe(() => this.hourEntryService.addEmptyProjectEntry())
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public trackById<T>(
    _: number,
    { projectEntry }: T & { projectEntry: ProjectEntry }
  ): unknown {
    return projectEntry.id;
  }

  public duplicateProjectEntry(projectEntry: ProjectEntry): void {
    this.hourEntryService.duplicateProjectEntry(projectEntry);
  }

  public removeProjectEntry(projectEntry: ProjectEntry): void {
    this.hourEntryService.removeProjectEntry(projectEntry);
  }

  public droppedProjectEntry(cdkDragDrop: CdkDragDrop<ProjectEntry>): void {
    this.hourEntryService.moveProjectEntry(
      cdkDragDrop.previousIndex,
      cdkDragDrop.currentIndex
    );
  }
}
