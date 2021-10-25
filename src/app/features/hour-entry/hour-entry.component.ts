import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { filter, Observable, Subscription, withLatestFrom } from 'rxjs';
import { Memoized } from '../../shared/decorators';
import { ProjectEntry } from './models';
import { HourEntryService } from './services/hour-entry.service';

@Component({
  selector: 'app-hour-entry',
  templateUrl: './hour-entry.component.html',
  styleUrls: ['./hour-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourEntryComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  constructor(private readonly hourEntryService: HourEntryService) {}

  @Memoized public get projectEntries$(): Observable<ProjectEntry[]> {
    return this.hourEntryService.currentProjectEntries$;
  }

  public ngOnInit(): void {
    // Ensure always one entry is visible
    this.subscriptions.add(
      this.hourEntryService.currentDate$
        .pipe(
          withLatestFrom(this.projectEntries$),
          filter(([currentDate, projectEntries]) => projectEntries.length === 0)
        )
        .subscribe(([currentDate, _]) =>
          this.hourEntryService.addEmptyProjectEntry(currentDate)
        )
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public trackById<T>(_: number, { id }: T & { id: unknown }): unknown {
    return id;
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
