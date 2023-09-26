import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'section-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-wrapper.component.html',
  styleUrls: ['./section-wrapper.component.scss'],
})
export class SectionWrapperComponent {
  @Input() fragmentTitle?: string;
  @Output() onVisibilityChange = new EventEmitter();
}
