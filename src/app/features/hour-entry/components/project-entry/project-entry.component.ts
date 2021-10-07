import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from 'ngx-typesafe-forms';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEntryComponent {
  public readonly descriptionControl = new FormControl<string>('', [
    Validators.required,
  ]);
  public readonly spentTimeControl = new FormControl<string>('', [
    Validators.required,
  ]);
}
