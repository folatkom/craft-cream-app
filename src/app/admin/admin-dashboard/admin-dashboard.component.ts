import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  public orders: any = [];
  public ordersByCustomer: any;
  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers() {
    const dbInstance = collection(this.firestore, 'orders');
    getDocs(dbInstance).then((response) => {
      this.orders = [
        ...response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }),
      ];
    });
  }
  getThem() {
    console.log(this.orders);
  }
}
