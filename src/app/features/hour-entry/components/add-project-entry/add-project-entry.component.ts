import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, Subscription, withLatestFrom } from 'rxjs';
import { HourEntryService } from '../../services/hour-entry.service';

@Component({
  selector: 'app-add-project-entry',
  templateUrl: './add-project-entry.component.html',
  styleUrls: ['./add-project-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectEntryComponent implements OnInit, OnDestroy {
  private readonly addEntryIndexSubject = new Subject<void>();

  private readonly subscriptions = new Subscription();

  constructor(private readonly hourEntryService: HourEntryService) {}

  public ngOnInit(): void {
    this.subscriptions.add(
      this.addEntryIndexSubject
        .pipe(withLatestFrom(this.hourEntryService.currentDate$))
        .subscribe(([_, currentDate]) =>
          this.hourEntryService.addEmptyProjectEntry(currentDate)
        )
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public addProjectEntry(): void {
    this.addEntryIndexSubject.next();
  }
}
