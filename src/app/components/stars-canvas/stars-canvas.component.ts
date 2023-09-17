import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-stars-canvas',
  standalone: true,
  templateUrl: './stars-canvas.component.html',
  styleUrls: ['./stars-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarsCanvasComponent {}
