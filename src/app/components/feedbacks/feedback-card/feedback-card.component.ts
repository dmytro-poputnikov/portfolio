import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { SharedModule } from 'src/app/shared/shared.module';

export interface Testimonial {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ duration: 7000 })],
})
export class FeedbackCardComponent {
  @Input() testimonial?: Testimonial;
  @Input() delay: number = 0;
}
