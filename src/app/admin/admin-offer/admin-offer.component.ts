import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { listItem } from 'src/app/shared/model/flavour';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-offer',
  templateUrl: './admin-offer.component.html',
  styleUrls: ['./admin-offer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOfferComponent implements OnInit, OnDestroy {
  public flavours: listItem[] = [];
  public containers: listItem[] = [];
  public list: any = [];
  public addItemForm!: FormGroup;
  public isModalVisible = false;
  public isFormVisible = false;
  public whichForm = '';
  public whichList = '';
  public inputValue = '';

  private subscriptions = new Subscription();

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

  addItem(value: listItem, itemType: string) {
    this.apiService.addData(value, itemType).then(
      (res) => {
        alert('Dodano pomyślnie');
      },
      (err) => {
        alert(err.message);
      }
    );
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
    value.name = value.name.replace(/\s*$/, '');
    if (
      this.whichForm === 'addFlavour' &&
      !this.flavours.some((item: listItem) => item.name === value.name)
    ) {
      this.addItem(value, 'flavours');
      this.getFlavours();
    } else if (
      this.whichForm === 'addContainer' &&
      !this.containers.some((item: listItem) => item.name === value.name)
    ) {
      this.addItem(value, 'containers');
      this.getContainers();
    } else {
      alert('Podana nazwa już istnieje');
    }
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  blockWhitespace() {
    this.inputValue = this.inputValue.replace(/^\s*/, '');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
