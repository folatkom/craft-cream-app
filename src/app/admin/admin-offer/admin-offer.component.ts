import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-offer',
  templateUrl: './admin-offer.component.html',
  styleUrls: ['./admin-offer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOfferComponent implements OnInit {
  public flavours: any = [];
  public containers: any = [];
  public list: any;
  public addItemForm!: FormGroup;
  public isModalVisible = false;
  public isFormVisible = false;
  public whichForm = '';
  constructor(private formBuilder: FormBuilder, private firestore: Firestore) {}

  ngOnInit(): void {
    this.getFlavours();
    this.getContainers();
    this.addItemForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
    });
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
  addItem(value: any, itemType: string) {
    const dbInstance = collection(this.firestore, itemType);
    addDoc(dbInstance, value)
      .then(() => {
        alert('Dodano pomyślnie');
      })
      .catch((err) => {
        alert(err.message);
      });
    this.addItemForm.reset();
  }
  showModal(whichList: string) {
    this.isFormVisible = false;
    if (whichList === 'flavours') {
      this.list = this.flavours;
    } else if (whichList === 'containers') {
      this.list = this.containers;
    } else {
      this.whichForm = whichList;
      this.isFormVisible = true;
    }
    this.toggleModal();
  }
  submitForm(value: any) {
    if (this.whichForm === 'addFlavour') {
      this.addItem(value, 'flavours');
      this.getFlavours();
    } else {
      this.addItem(value, 'containers');
      this.getContainers();
    }
  }
  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}
