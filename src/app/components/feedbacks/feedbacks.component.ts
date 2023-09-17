import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksComponent {}
