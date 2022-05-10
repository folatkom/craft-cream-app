import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomersComponent implements OnInit {
  public registerForm!: FormGroup;
  public customers: any = [];
  public isModalVisible = false;
  public isCustomersListVisible = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService
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
    this.registerForm.reset();
    this.getCustomers();
  }
  getCustomers() {
    this.apiService.getData('users').subscribe(
      (res) =>
        (this.customers = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        }))
    );
  }
  showModal(content: string) {
    this.isCustomersListVisible = false;
    if (content === 'list') {
      this.isCustomersListVisible = true;
    }
    this.toggleModal();
  }
  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}
