import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomersComponent implements OnInit, OnDestroy {
  public customers: any = [];
  public isModalVisible = false;
  public isCustomersListVisible = false;

  private subscriptions = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    const sub = this.apiService.getData('users').subscribe(
      (res) =>
        (this.customers = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        }))
    );
    this.subscriptions.add(sub);
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
