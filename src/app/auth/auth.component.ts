import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public loginForm!: FormGroup;
  public loginError = '';
  constructor(private formBuilder: FormBuilder, private auth: Auth) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }
  login(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password)
      .then((response: any) => {
        console.log(response.user);
      })
      .catch(() => {
        alert('Niewłaściwy email lub hasło');
      });
  }
}
