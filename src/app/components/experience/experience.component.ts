import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  NgxTimelineModule,
  NgxTimelineEvent,
  NgxTimelineItemPosition,
} from '@frxjs/ngx-timeline';

import { zeto, simplar } from 'src/app/constants';
import {
  flipInXOnEnterAnimation,
  slideInLeftOnEnterAnimation,
} from 'angular-animations';
import { state, style } from '@angular/animations';
import { animate, inView, stagger } from 'motion';
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SharedModule, NgxTimelineModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [flipInXOnEnterAnimation({ duration: 1500, delay: 500 })],
})
export class ExperienceComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.animate();
  }
  onVisibilityChange($event: any) {
    if ($event) this.enableAnimation = true;
  }

  enableAnimation = false;
  ngxTimelineItemPosition = NgxTimelineItemPosition;
  events: any[] = [
    {
      timestamp: new Date('2023-12-31T10:30:00'),
      title: 'Angular Developer',
      companyName: 'ZETO SOFTWARE Sp. z o.o.',
      timeInPosition: 'Jan 2023 - Present',
      description: '',
      points: [
        'Developing and maintaining web applications using Angular and other related technologies such as: Ionic, Java, PostgreSQL, Docker, Jira, SOAP, WSL, Git and Bitbucket.',
        'Implementing responsive design and ensuring cross-browser compatibility.',
        'Mentoring a group of interns for a month, imparting them with knowledge and skills in Angular.',
      ],
      id: 1,
      itemPosition: NgxTimelineItemPosition.ON_LEFT,
      icon: zeto,
    },
    {
      timestamp: new Date('2022-12-31T10:30:00'),
      title: 'PLC Programmer',
      companyName: 'Simplar Mikołaj Feliński',
      timeInPosition: 'Aug 2018 - Dec 2022',
      description: '',
      points: [
        'Designing and implementing applications for controlling welding robots using Angular and Flask frameworks (over one year).',
        'Programming of industrial automation systems.',
        'Creating applications for programmable logic controllers (PLCs) to control technological processes, along with graphical interface for clients accessible through a Web Server and HMI.',
      ],
      id: 1,
      itemPosition: NgxTimelineItemPosition.ON_RIGHT,
      icon: simplar,
    },
  ];

  animate() {
    inView('#experienceHeader', (info) => {
      animate(
        info.target,
        {
          opacity: 1,
          x: [-100, 0],
        },
        {
          duration: 1,
          delay: 1,
          easing: 'ease-in',
          allowWebkitAcceleration: true,
        }
      );

      animate(
        '.event',
        {
          opacity: 1,
        },
        {
          delay: stagger(0.4),
          duration: 1,
          easing: [0.22, 0.03, 0.26, 1],
          allowWebkitAcceleration: true,
        }
      );
    });
  }
}
