import { ChangeDetectionStrategy, Component } from '@angular/core';
import { testimonials } from 'src/app/constants';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedbackCardComponent } from './feedback-card/feedback-card.component';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
  imports: [SharedModule, FeedbackCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ duration: 10000 })],
})
export class FeedbacksComponent {
  testimonials = testimonials;
  showCards = false;
}
