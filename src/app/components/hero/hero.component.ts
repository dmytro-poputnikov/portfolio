import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComputersCanvasComponent } from '../canvas';
import { animate, style, transition, trigger } from '@angular/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [ComputersCanvasComponent, SharedModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('moveUpDown', [
      transition('* <=> *', [
        animate('0.8s', style({ transform: 'translateY(24px)' })),
        animate('1s 0.4s', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class HeroComponent {
  animState = false;

  animDone() {
    this.animState = !this.animState;
  }
}
