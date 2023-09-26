import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { testimonials } from 'src/app/constants';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedbackCardComponent } from './feedback-card/feedback-card.component';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { animate, inView, spring, stagger } from 'motion';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
  imports: [SharedModule, FeedbackCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ duration: 10000 })],
})
export class FeedbacksComponent implements AfterViewInit {
  animationShowed = false;

  ngAfterViewInit(): void {
    inView('.feedbacksHeader', (header) => {
      if (!this.animationShowed) {
        animate(
          header.target,
          {
            opacity: 1,
            x: [-50, 0],
          },
          {
            duration: 2.5,
            delay: 1,
            easing: spring({ velocity: 100 }),
            allowWebkitAcceleration: true,
          }
        );

        animate(
          '.feedback_card',
          {
            opacity: 1,
            y: [-50, 0],
          },
          {
            delay: stagger(0.4),
            duration: 1.5,
            easing: [0.22, 0.03, 0.26, 1],
            allowWebkitAcceleration: true,
          }
        );
      }
      this.animationShowed = true;
    });
  }
  testimonials = testimonials;
}
