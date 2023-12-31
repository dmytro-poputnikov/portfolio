import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { projects } from 'src/app/constants/index';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import { animate, inView, stagger } from 'motion';

@Component({
  selector: 'app-works',
  standalone: true,
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  imports: [SharedModule, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorksComponent implements AfterViewInit {
  projects = projects;
  animationShowedHeader = false;
  animationShoweCards = false;

  ngAfterViewInit(): void {
    inView('#worksHeader', (info) => {
      if (!this.animationShowedHeader) {
        this.animationShowedHeader = true;
        animate(
          info.target,
          {
            opacity: 1,
            x: [-100, 0],
          },
          {
            duration: 1,
            delay: 0.5,
            easing: 'ease-in',
            allowWebkitAcceleration: true,
          }
        );
      }
    });

    inView('.projectCards_wrapper', (info) => {
      if (!this.animationShoweCards) {
        this.animationShoweCards = true;
        animate(
          '.project-card',
          {
            opacity: 1,
          },
          {
            duration: 1,
            delay: stagger(0.4),
            easing: 'ease-in',
            allowWebkitAcceleration: true,
          }
        );
      }
    });
  }
}
