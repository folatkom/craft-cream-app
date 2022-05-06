import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
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
  addCustomer(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then((result) => {
        //this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
