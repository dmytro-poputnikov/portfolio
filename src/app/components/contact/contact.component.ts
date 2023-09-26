import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EarthComponent } from '../canvas/earth/earth.component';
import { animate, inView } from 'motion';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, ReactiveFormsModule, EarthComponent],
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactFormWrapper') contactFormWrapper!: ElementRef;
  @ViewChild('contactFormElement') contactFormElement: ElementRef | undefined;
  @Input() visible = false;

  loading = false;
  submitted = false;

  contactForm = this.fb.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {}
  ngAfterViewInit(): void {
    this.animate();
  }

  onSubmit($event: any) {
    $event.preventDefault();
    this.submitted = true;

    if (this.contactForm.valid) {
      this.loading = true;

      console.log(this.contactForm.value);

      emailjs
        .send(
          'service_qapp6rk',
          'template_5zu761a',
          {
            from_name: this.contactForm.value.name,
            to_name: 'Dima',
            from_email: this.contactForm.value.email,
            to_email: 'dpoputnikov@gmail.com',
            message: this.contactForm.value.message,
          },
          '_yvCSBOFuvB9Zv2Up'
        )
        .then(
          () => {
            this.loading = false;
            alert('Thank you. I will get back to you as soon as possible.');
            this.contactForm.reset();
          },
          (error) => {
            console.log(error);
            alert('Something went wrong');
          }
        );
    }
    return false;
  }

  clearErrorMessage(fieldName: string) {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors) {
      field.markAsUntouched();
    }
  }

  get contactFormControl() {
    return this.contactForm.controls;
  }

  animate() {
    inView(this.contactFormWrapper.nativeElement, (info) => {
      animate(
        info.target,
        {
          opacity: 1,
          x: [-100, 0],
        },
        {
          duration: 1,
          delay: 0.1,
          easing: 'ease-in',
          allowWebkitAcceleration: true,
        }
      );
    });
  }
}
