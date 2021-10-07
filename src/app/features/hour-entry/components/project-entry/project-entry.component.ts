import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectEntryComponent {
}
