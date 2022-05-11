import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Flavour, listItem } from '../shared/model/flavour';
import { ApiService } from '../shared/services/api.service';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { UserOrder } from '../shared/model/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent implements OnInit, OnDestroy {
  public loggedCustomer = '';
  public uid = '';
  public flavours: Flavour[] = [];
  public containers: Container[] = [];
  public isModalVisible = false;
  public whichModal = '';
  public favourites: listItem[] = [];
  public orders: UserOrder[] = [];

  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loggedCustomer = this.authService.userData.email;
    this.uid = this.authService.userData.uid;
    this.getFlavours();
    this.getContainers();
    this.getFavourites();
    this.getOrders();
  }

  getFlavours() {
    const sub = this.apiService.getData('flavours').subscribe(
      (res) =>
        (this.flavours = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        }))
    );
    this.subscriptions.add(sub);
  }

  getContainers() {
    const sub = this.apiService.getData('containers').subscribe(
      (res) =>
        (this.containers = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        }))
    );
    this.subscriptions.add(sub);
  }

  getFavourites() {
    const sub = this.apiService
      .getData(`users/${this.uid}/favourites`)
      .subscribe(
        (res) =>
          (this.favourites = res.map((e: any) => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            };
          }))
      );
    this.subscriptions.add(sub);
  }

  getOrders() {
    const sub = this.apiService
      .getData(`users/${this.uid}/orders`)
      .subscribe((res) => {
        this.orders = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        });
      });
    this.subscriptions.add(sub);
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  showModal(whichModal: string) {
    this.whichModal = whichModal;
    this.toggleModal();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
