import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedInCustomer = false;
  isLoggedInAdmin = false;
  constructor(private auth: Auth, private router: Router) {}
  login(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password)
      .then(() => {
        if (value.email === 'lodziarz@craftcream.com') {
          this.isLoggedInAdmin = true;
          this.isLoggedInCustomer = false;
          this.router.navigate(['app/admin/dashboard']);
        } else {
          this.isLoggedInCustomer = true;
          this.isLoggedInAdmin = false;
          this.router.navigate(['app/customer']);
        }
      })
      .catch(() => {
        alert('Niewłaściwy email lub hasło');
      });
  }
  logout() {
    this.router.navigate(['auth']);
  }
}
