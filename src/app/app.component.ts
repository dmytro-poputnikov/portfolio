import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { TABLE_COMPONENTS } from './components';
import { SharedModule } from './shared/shared.module';
import * as THREE from 'three';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [...TABLE_COMPONENTS, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  ngOnDestroy(): void {
    THREE.Cache.clear();
  }
  title = 'portfolio';
  aboutVisible = false;
  experienceVisible = false;
  techVisible = false;
  workVisible = false;
  contactSectionVisible = false;
  feedbacksVisible = false;
}
