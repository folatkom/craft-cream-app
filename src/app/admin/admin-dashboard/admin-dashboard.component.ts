import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Flavour } from 'src/app/shared/model/flavour';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  public orders: any = [];
  public ordersByCustomer: any;
  public allOrders: Flavour[] = [];
  public allOrdersSummary: Flavour[] = [];
  public isModalVisible = false;
  public isSummaryVisible = false;
  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.getOrdersByCustomers();
  }

  getOrdersByCustomers() {
    this.apiService.getData('orders').subscribe((res) => {
      this.orders = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        };
      });
      this.getAllOrders();
    });
  }
  getAllOrders() {
    this.allOrders = this.orders.flatMap((item: any) => {
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
}
