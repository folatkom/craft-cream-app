import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listItem } from 'src/app/shared/model/flavour';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-offer',
  templateUrl: './admin-offer.component.html',
  styleUrls: ['./admin-offer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOfferComponent implements OnInit {
  public flavours: listItem[] = [];
  public containers: listItem[] = [];
  public list: any = [];
  public addItemForm!: FormGroup;
  public isModalVisible = false;
  public isFormVisible = false;
  public whichForm = '';
  public whichList = '';
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getFlavours();
    this.getContainers();
    this.addItemForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
    });
  }
  getFlavours() {
    return this.apiService.getData('flavours').subscribe(
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
    return this.apiService.getData('containers').subscribe(
      (res) =>
        (this.containers = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        }))
    );
  }
  addItem(value: listItem, itemType: string) {
    this.apiService.addData(value, itemType);
    this.addItemForm.reset();
  }
  deleteItem(id: string) {
    this.apiService.deleteData(id, this.whichList);
    this.getContainers();
    this.getFlavours();
    this.toggleModal();
  }
  showModal(whichList: string) {
    this.isFormVisible = false;
    this.whichList = whichList;
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
  submitForm(value: listItem) {
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
