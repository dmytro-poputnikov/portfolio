import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { services } from 'src/app/constants';
import {
  CardDetails,
  ServiceCardComponent,
} from './service-card/service-card.component';
import { CommonModule } from '@angular/common';
import { animate, inView, spring, stagger } from 'motion';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [ServiceCardComponent, CommonModule],
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  stopInView: any;
  animationShowed = false;

  ngAfterViewInit(): void {
    this.animate();
  }

  @ViewChild('aboutHeader') aboutHeader!: ElementRef;

  services = services;
  trackByCardTitle: TrackByFunction<CardDetails> = (index, card) => card.title;

  animate() {
    this.stopInView = inView('#aboutHeader p.about_description', (header) => {
      if (!this.animationShowed) {
        animate(
          this.aboutHeader.nativeElement,
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
          '.service_card',
          {
            opacity: 1,
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

  ngOnDestroy(): void {
    this.stopInView();
  }
}
