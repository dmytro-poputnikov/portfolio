import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  NgZone,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appVisibility]',
})
export class VisibilityDirective implements OnInit, OnDestroy {
  @Output() visibilityChange = new EventEmitter<boolean>();
  private observer: IntersectionObserver | undefined;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {}

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.05,
    };

    this.observer = new IntersectionObserver((entries) => {
      this.ngZone.run(() => {
        entries.forEach((entry) => {
          this.visibilityChange.emit(entry.isIntersecting);
        });
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect(); // Zatrzymaj obserwację, gdy dyrektywa jest niszczona.
    }
  }
}
