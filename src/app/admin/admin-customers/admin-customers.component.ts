import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomersComponent implements OnInit {
  public registerForm!: FormGroup;
  public customers: any = [];
  public isCustomersListVisible = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private firestore: Firestore
  ) {}
  ngOnInit(): void {
    this.getCustomers();
    this.registerForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }

  addCustomer(value: any) {
    this.authService.addCustomer(value);
    const dbInstance = collection(this.firestore, 'users');
    addDoc(dbInstance, value)
      .then(() => {
        alert('Dodano nowego klienta');
      })
      .catch((err) => {
        alert(err.message);
      });
    this.registerForm.reset();
    this.isCustomersListVisible = false;
    this.getCustomers();
  }
  getCustomers() {
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance).then((response) => {
      this.customers = [
        ...response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }),
      ];
    });
  }
  showCustomersList() {
    this.isCustomersListVisible = !this.isCustomersListVisible;
  }
}
