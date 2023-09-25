import { ChangeDetectionStrategy, Component } from '@angular/core';
import { projects } from 'src/app/constants/index';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-works',
  standalone: true,
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  imports: [SharedModule, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorksComponent {
  projects = projects;
}
