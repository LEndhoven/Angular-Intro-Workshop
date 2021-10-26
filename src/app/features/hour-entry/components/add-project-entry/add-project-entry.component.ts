import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HourEntryService } from '../../services/hour-entry.service';

@Component({
  selector: 'app-add-project-entry',
  templateUrl: './add-project-entry.component.html',
  styleUrls: ['./add-project-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectEntryComponent {
  constructor(private readonly hourEntryService: HourEntryService) {}

  public addProjectEntry(): void {
    this.hourEntryService.addEmptyProjectEntry();
  }
}
