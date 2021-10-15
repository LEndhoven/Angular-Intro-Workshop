import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from 'ngx-typesafe-forms';
import { filter, map, Observable, Subscription } from 'rxjs';
import { observeProperty } from '../../../../shared/rjxx-utils/observe-property';
import { Project, ProjectEntry } from '../../models';
import { Memoized } from '../../../../shared/decorators';
import { notUndefined } from '../../../../shared/predicates';
import { HourEntryService } from '../../services/hour-entry.service';

const TIME_ENTRIES = [...Array(33).keys()].map(
  (keyIndex) =>
    `${Math.floor(keyIndex / 4)}:${((15 * keyIndex) % 60)
      .toString()
      .padStart(2, '0')}`
);
@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEntryComponent implements OnInit, OnDestroy {
  @Input() public projectEntry: ProjectEntry;

  public readonly projectControl = new FormControl<string | Project | null>(
    '',
    [Validators.required]
  );

  public readonly descriptionControl = new FormControl<string>('', [
    Validators.required,
  ]);
  public readonly spentTimeControl = new FormControl<string>('', [
    Validators.required,
  ]);

  private readonly subscriptions = new Subscription();

  constructor(private readonly hourEntryService: HourEntryService) {}

  @Memoized public get filteredTimes$(): Observable<string[]> {
    return this.spentTimeControl.valueChanges.pipe(
      map((searchText) =>
        TIME_ENTRIES.filter((timeEntry) => timeEntry.includes(searchText))
      )
    );
  }

  public ngOnInit(): void {
    console.log(TIME_ENTRIES);
    this.subscriptions.add(
      this.projectEntry$.subscribe((projectEntry) => {
        this.descriptionControl.setValue(projectEntry.description ?? '');
        this.spentTimeControl.setValue(projectEntry.timeSpent ?? '');
      })
    );
  }

  public ngOnDestroy(): void {
    this.hourEntryService.updateProjectEntry({
      id: this.projectEntry.id,
      date: this.projectEntry.date,
      description: this.descriptionControl.value,
      timeSpent: this.spentTimeControl.value,
    });

    this.subscriptions.unsubscribe();
  }

  @Memoized private get projectEntry$(): Observable<ProjectEntry> {
    return observeProperty(this as ProjectEntryComponent, 'projectEntry').pipe(
      filter(notUndefined)
    );
  }
}
