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
import { Order, UserOrder } from 'src/app/shared/model/order';
import { ApiService } from 'src/app/shared/services/api.service';
import { threadId } from 'worker_threads';

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
  @Input() orders: UserOrder[] = [];
  @Output() clickButton = new EventEmitter<void>();
  public order: Flavour[] = [];
  public userOrder: Flavour[] = [];
  public previousOrder: UserOrder = {
    order: [],
    date: '',
  };
  public date = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  public step: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUserOrder();
    console.log(this.orders);
  }
  isFavourite(flavour: string): boolean {
    return this.favourites.some((item: listItem) => item.name === flavour);
  }
  getUserOrder() {
    this.orders.map((el: UserOrder) => {
      if (this.date === el.date) {
        this.userOrder = el.order;
      }
      this.previousOrder = el;
    });
  }
  updateOrder(flavour: Flavour) {
    this.order = this.order.filter((item) => item.name !== flavour.name);
    if (flavour.containers.length !== 0) {
      this.order.push(flavour);
    }
  }
  sendOrder(order: Flavour[]) {
    this.apiService
      .addData(
        { order: [...order], date: this.date },
        `users/${this.uid}/orders`
      )
      .then(
        (res) => {
          alert('Zamówienie zostało złożone');
        },
        (err) => {
          alert(err.message);
        }
      );
    this.apiService.addData(
      { order: [...order], user: this.loggedCustomer, date: this.date },
      'orders'
    );
    this.clickButton.emit();
  }
}
