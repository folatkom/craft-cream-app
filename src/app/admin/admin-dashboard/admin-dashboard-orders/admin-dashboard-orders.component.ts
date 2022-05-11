import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-admin-dashboard-orders',
  templateUrl: './admin-dashboard-orders.component.html',
  styleUrls: ['./admin-dashboard-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardOrdersComponent {
  @Input() orders: Order[] = [];
}
