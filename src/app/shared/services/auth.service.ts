import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedInCustomer = false;
  isLoggedInAdmin = false;
  loggedCustomer = '';
  loggedCustomerID = '';
  userData: any;
  constructor(
    private auth: Auth,
    private router: Router,
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  login(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password).then(
      (res) => {
        if (value.email === 'lodziarz@craftcream.com') {
          this.isLoggedInAdmin = true;
          this.isLoggedInCustomer = false;
          this.router.navigate(['app/admin/dashboard']);
        } else {
          this.isLoggedInCustomer = true;
          this.isLoggedInAdmin = false;
          this.router.navigate(['app/customer']);
          this.SetUserData(res.user);
        }
      },
      (err) => {
        alert('Niewłaściwy email lub hasło');
      }
    );
  }
  logout() {
    this.router.navigate(['auth']);
  }
  addCustomer(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password).then(
      (res) => {
        this.SetUserData(res.user);
        alert('Dodano użytkownika');
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
