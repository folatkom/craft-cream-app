import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomersComponent implements OnInit {
  public customers: any = [];
  public isModalVisible = false;
  public isCustomersListVisible = false;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
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
