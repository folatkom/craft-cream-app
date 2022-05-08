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
export interface ChosenFlavour {
  name: string;
  containers: ChosenContainer[];
}
export interface ChosenContainer {
  name: string;
  quantity: number;
}
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
  public whichModal = '';
  public favourites: any = [];
  public chosenFlavour: ChosenFlavour = {
    name: '',
    containers: [],
  };
  public order: ChosenFlavour[] = [];
  public orderReady = false;

  constructor(private authService: AuthService, private firestore: Firestore) {}

  ngOnInit(): void {
    this.getFlavours();
    this.getContainers();
    this.getFavourites();
    this.loggedCustomer = this.authService.userData.email;
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
  getFavourites() {
    const dbInstance = collection(
      this.firestore,
      `users/${this.authService.userData.uid}/favourites`
    );
    getDocs(dbInstance).then((response) => {
      this.favourites = [
        ...response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }),
      ];
    });
  }
  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
  addToFavourites(flavour: any) {
    const dbInstance = collection(
      this.firestore,
      `users/${this.authService.userData.uid}/favourites`
    );
    addDoc(dbInstance, flavour)
      .then(() => {
        alert('Dodano do ulubionych');
      })
      .catch((err) => {
        alert(err.message);
      });
    this.getFavourites();
    this.toggleModal();
  }
  deleteFavourites(flavour: string) {
    const favouriteToDelete = this.favourites.filter(
      (item: any) => item.name === flavour
    );
    const itemToDelete = doc(
      this.firestore,
      `users/${this.authService.userData.uid}/favourites`,
      favouriteToDelete[0].id
    );
    deleteDoc(itemToDelete)
      .then(() => {
        alert('Usunięto pomyślnie');
      })
      .catch((err) => {
        alert(err.message);
      });
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
  updateOrder(flavour: ChosenFlavour) {
    this.order = this.order.filter((item) => item.name !== flavour.name);
    this.order.push(flavour);
  }
  createOrder() {
    this.orderReady = true;
  }
}
