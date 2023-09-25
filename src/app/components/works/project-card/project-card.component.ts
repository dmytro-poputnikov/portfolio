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
import { github } from 'src/app/constants';
import { SharedModule } from 'src/app/shared/shared.module';

export interface ProjectDetails {
  name: string;
  description: string;
  tags: Tag[];
  image: string;
  source_code_link: string;
}

interface Tag {
  name: string;
  color: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, NgTiltModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
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
export class ProjectCardComponent {
  @Input() projectDetails?: ProjectDetails;
  @Input() delay: number = 0;
  animationState = 'hide';
  github = github;

  openGithub() {
    window.open(this.projectDetails?.source_code_link, '_blank');
  }
}
