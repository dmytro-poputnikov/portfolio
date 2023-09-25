import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgTiltModule } from '@geometricpanda/angular-tilt';
import { InViewportModule } from 'ng-in-viewport';
import { SharedModule } from 'src/app/shared/shared.module';

export interface CardDetails {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
  imports: [NgTiltModule, SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),

      transition('* => start', [
        style({ opacity: 0 }),
        animate(`1000ms {{ delay }}ms ease-out`, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ServiceCardComponent {
  @Input() cardDetails?: CardDetails;
  @Input() delay: number = 0;
  animationState = 'hide';
}
