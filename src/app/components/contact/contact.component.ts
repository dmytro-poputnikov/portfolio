import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { slideInLeftOnEnterAnimation } from 'angular-animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { EarthComponent } from '../canvas/earth/earth.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInLeftOnEnterAnimation({ duration: 2500, delay: 1000 })],
  imports: [SharedModule, ReactiveFormsModule, EarthComponent],
})
export class ContactComponent {
  visible = false;
  loading = false;
  submitted = false;

  contactForm = this.fb.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {}

  onSubmit($event: any) {
    $event.preventDefault();
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
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
}
