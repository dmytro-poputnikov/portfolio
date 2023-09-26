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
})
export class ServiceCardComponent {
  @Input() cardDetails?: CardDetails;
  animationState = 'hide';
}
