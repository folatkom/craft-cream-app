import { formatDate } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Flavour } from 'src/app/shared/model/flavour';
import { Order } from 'src/app/shared/model/order';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];
  public currentOrders: Order[] = [];
  public isModalVisible = false;
  public isSummaryVisible = false;
  public allOrders: Flavour[] = [];
  public allOrdersSummary: Flavour[] = [];
  public date = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');

  private subscriptions = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getOrdersByCustomers();
  }

  getOrdersByCustomers() {
    const sub = this.apiService.getData('orders').subscribe((res) => {
      this.orders = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        };
      });
      this.orders.map((el: any) => {
        if (this.date === el.date) {
          this.currentOrders.push(el);
        }
      });
      console.log(this.currentOrders);
      this.getAllOrders();
    });
    this.subscriptions.add(sub);
  }
  getAllOrders() {
    this.allOrders = this.currentOrders.flatMap((item: any) => {
      return item.order;
    });
    this.allOrders.forEach((flavourToCheck) => {
      if (
        !this.allOrdersSummary.some(
          (item: Flavour) => item.name === flavourToCheck.name
        )
      ) {
        this.allOrdersSummary.push(flavourToCheck);
      } else {
        let elementToUpdate = this.allOrders.find(
          (el) => el.name == flavourToCheck.name
        );
        flavourToCheck.containers.forEach((containerToCheck) => {
          if (
            !elementToUpdate?.containers.some(
              (item) => item.name === containerToCheck.name
            )
          ) {
            console.log(elementToUpdate);
            elementToUpdate?.containers.push(containerToCheck);
          } else {
            let containerToUpdate = elementToUpdate.containers.find(
              (el) => el.name == containerToCheck.name
            );
            elementToUpdate.containers = elementToUpdate.containers.filter(
              (item) => item.name !== containerToCheck.name
            );
            containerToUpdate!.quantity += containerToCheck.quantity;
            elementToUpdate.containers.push(containerToUpdate!);
          }
        });
        this.allOrdersSummary = this.allOrdersSummary.filter(
          (item) => item.name !== flavourToCheck.name
        );
        this.allOrdersSummary.push(elementToUpdate!);
      }
    });
    console.log(this.allOrdersSummary);
  }
  showModal(value: string) {
    if (value === 'summary') {
      this.isSummaryVisible = true;
    } else {
      this.isSummaryVisible = false;
    }
    this.toggleModal();
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
