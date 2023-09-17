import {
  ChangeDetectionStrategy,
  Component,
  TrackByFunction,
} from '@angular/core';
import { services } from 'src/app/constants';
import {
  CardDetails,
  ServiceCardComponent,
} from './service-card/service-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [ServiceCardComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  services = services;

  trackByCardTitle: TrackByFunction<CardDetails> = (index, card) => card.title;
}
