import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BallComponent } from '../canvas';
import { technologies } from 'src/app/constants';
@Component({
  selector: 'app-tech',
  standalone: true,
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, BallComponent],
})
export class TechComponent {
  technologies = technologies;
  showBalls = false;
  changeVisibility($event: any) {
    console.log($event);
    this.showBalls = $event;
  }
}
