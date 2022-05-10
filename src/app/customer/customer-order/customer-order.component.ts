import { formatDate } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Flavour, listItem } from 'src/app/shared/model/flavour';
import { Order } from 'src/app/shared/model/order';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrderComponent implements OnInit {
  @Input() containers: any = [];
  @Input() flavours: Flavour[] = [];
  @Input() favourites: listItem[] = [];
  @Input() uid = '';
  @Input() loggedCustomer = '';
  @Input() userOrder: any;
  @Output() clickButton = new EventEmitter<void>();
  public order: Flavour[] = [];
  public orderReady = false;

  public date = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}
  isFavourite(flavour: string): boolean {
    return this.favourites.some((item: any) => item.name === flavour);
  }
  updateOrder(flavour: Flavour) {
    this.order = this.order.filter((item) => item.name !== flavour.name);
    this.order.push(flavour);
  }
  toggleOrder() {
    this.orderReady = !this.orderReady;
  }

  sendOrder() {
    this.apiService.addData(
      { ...this.order },
      `users/${this.uid}/currentOrder`
    );
    this.apiService.addData(
      { order: [...this.order], user: this.loggedCustomer, date: this.date },
      'orders'
    );
    this.clickButton.emit();
  }
}
