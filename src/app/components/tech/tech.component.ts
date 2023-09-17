import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tech',
  standalone: true,
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechComponent {}
