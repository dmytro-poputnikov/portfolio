import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityDirective } from './directives/visibility-observer.directive';
import { SectionWrapperComponent } from './components/section-wrapper/section-wrapper.component';

const MODULES = [CommonModule, SectionWrapperComponent];

const DECLARATIONS = [VisibilityDirective];
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...MODULES, ...DECLARATIONS],
})
export class SharedModule {}
