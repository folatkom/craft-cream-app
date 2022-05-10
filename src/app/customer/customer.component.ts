import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Flavour } from '../shared/model/flavour';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent implements OnInit {
  public loggedCustomer = '';
  public uid = '';
  public flavours: any = [];
  public containers: any = [];
  public isModalVisible = false;
  public whichModal = '';
  public favourites: any = [];
  public chosenFlavour: Flavour = {
    name: '',
    containers: [],
  };
  public order: Flavour[] = [];
  public orderReady = false;

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
  }

  getFlavours() {
    this.apiService.getData('flavours').subscribe(
      (res) =>
        (this.flavours = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        }))
    );
  }
  getContainers() {
    this.apiService.getData('containers').subscribe(
      (res) =>
        (this.containers = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        }))
    );
  }
  getFavourites() {
    this.apiService.getData(`users/${this.uid}/favourites`).subscribe(
      (res) =>
        (this.favourites = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        }))
    );
  }
  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
  addToFavourites(flavour: any) {
    const flavourToAdd = {
      name: flavour.name,
    };
    this.apiService.addData(flavourToAdd, `users/${this.uid}/favourites`);
    this.getFavourites();
    this.toggleModal();
  }
  deleteFavourites(flavour: string) {
    const favouriteToDelete = this.favourites.filter(
      (item: any) => item.name === flavour
    );
    this.apiService.deleteData(
      favouriteToDelete[0].id,
      `users/${this.uid}/favourites`
    );
    this.getFavourites();
    this.toggleModal();
  }
  isFavourite(flavour: string): boolean {
    return this.favourites.some((item: any) => item.name === flavour);
  }
  showModal(whichModal: string) {
    this.whichModal = whichModal;
    this.toggleModal();
  }
  updateOrder(flavour: Flavour) {
    this.order = this.order.filter((item) => item.name !== flavour.name);
    this.order.push(flavour);
  }
  createOrder() {
    this.orderReady = true;
  }
  sendOrder() {
    this.apiService.addData(
      { ...this.order },
      `users/${this.uid}/currentOrder`
    );
    this.apiService.addData(
      { order: [...this.order], user: this.loggedCustomer },
      'orders'
    );
    this.toggleModal();
  }
}
