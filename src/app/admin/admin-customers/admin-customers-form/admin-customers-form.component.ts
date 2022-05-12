import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-customers-form',
  templateUrl: './admin-customers-form.component.html',
  styleUrls: ['./admin-customers-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomersFormComponent implements OnInit {
  @Input() customers: any;
  public registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }

  addCustomer(value: any) {
    if (!this.customers.some((item: any) => item.email === value.email)) {
      this.authService.addCustomer(value);
      this.registerForm.reset();
    } else {
      alert('Podany email jest już w bazie klientów');
    }
  }
}
