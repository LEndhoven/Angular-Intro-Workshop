import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from 'ngx-typesafe-forms';
import { filter, Observable, Subscription } from 'rxjs';
import { observeProperty } from '../../../../shared/rjxx-utils/observe-property';
import { ProjectEntry } from '../../models';
import { Memoized } from '../../../../shared/decorators';
import { notUndefined } from '../../../../shared/predicates';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEntryComponent implements OnInit, OnDestroy {
  @Input() public projectEntry: ProjectEntry;

  public readonly descriptionControl = new FormControl<string>('', [
    Validators.required,
  ]);
  public readonly spentTimeControl = new FormControl<string>('', [
    Validators.required,
  ]);

  private readonly subscriptions = new Subscription();

  public ngOnInit(): void {
    this.subscriptions.add(
      this.projectEntry$.subscribe((projectEntry) => {
        this.descriptionControl.setValue(projectEntry.description ?? '');
        this.spentTimeControl.setValue(projectEntry.timeSpent ?? '');
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @Memoized private get projectEntry$(): Observable<ProjectEntry> {
    return observeProperty(this as ProjectEntryComponent, 'projectEntry').pipe(
      filter(notUndefined)
    );
  }
}
