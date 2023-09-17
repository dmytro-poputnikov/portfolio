import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TABLE_COMPONENTS } from './components';
import { SharedModule } from './shared/shared.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [...TABLE_COMPONENTS, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'portfolio';
}
