import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent implements OnInit {
  public loggedCustomer = '';
  public flavours: any = [];
  public containers: any = [];
  public isModalVisible = false;
  constructor(private authService: AuthService, private firestore: Firestore) {}

  ngOnInit(): void {
    this.getFlavours();
    this.getContainers();
    this.loggedCustomer = this.authService.loggedCustomer;
  }
  getFlavours() {
    const dbInstance = collection(this.firestore, 'flavours');
    getDocs(dbInstance).then((response) => {
      this.flavours = [
        ...response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }),
      ];
    });
  }
  getContainers() {
    const dbInstance = collection(this.firestore, 'containers');
    getDocs(dbInstance).then((response) => {
      this.containers = [
        ...response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }),
      ];
    });
  }
  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}
