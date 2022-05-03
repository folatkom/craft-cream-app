import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  constructor(private auth: Auth, private router: Router) {}
  login(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password)
      .then(() => {
        this.isLoggedIn = true;
        this.router.navigate(['app/customer-dashboard']);
      })
      .catch(() => {
        alert('Niewłaściwy email lub hasło');
      });
  }
}
