import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomersComponent {
  public isModalVisible = false;
  public isCustomersListVisible = false;
  constructor() {}

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
