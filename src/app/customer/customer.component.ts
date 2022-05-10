import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Flavour, listItem } from '../shared/model/flavour';
import { ApiService } from '../shared/services/api.service';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent implements OnInit {
  public loggedCustomer = '';
  public uid = '';
  public flavours: Flavour[] = [];
  public containers: Container[] = [];
  public isModalVisible = false;
  public whichModal = '';
  public favourites: listItem[] = [];

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
    console.log(this.containers);
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
  showModal(whichModal: string) {
    this.whichModal = whichModal;
    this.toggleModal();
  }
}
