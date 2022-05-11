import { formatDate } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Flavour } from 'src/app/shared/model/flavour';
import { Order } from 'src/app/shared/model/order';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  public orders: Order[] = [];
  public isModalVisible = false;
  public isSummaryVisible = false;
  public date = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getOrdersByCustomers();
  }

  getOrdersByCustomers() {
    this.apiService.getData('orders').subscribe((res) => {
      this.orders = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        };
      });
      this.orders.map((el: any) => {
        if (this.date !== el.date) {
          this.apiService.deleteData(el.id, 'orders');
        }
      });
    });
  }

  showModal(value: string) {
    if (value === 'summary') {
      this.isSummaryVisible = true;
    } else {
      this.isSummaryVisible = false;
    }
    this.toggleModal();
  }
  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}
