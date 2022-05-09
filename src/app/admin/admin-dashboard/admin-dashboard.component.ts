import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChosenFlavour } from 'src/app/customer/customer.component';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  public orders: any = [];
  public ordersByCustomer: any;
  public allOrders: ChosenFlavour[] = [];
  public allOrdersSummary: ChosenFlavour[] = [];
  public isModalVisible = false;
  public isSummaryVisible = false;
  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.getOrdersByCustomers();
  }
  getOrdersByCustomers() {
    const dbInstance = collection(this.firestore, 'orders');
    getDocs(dbInstance).then((response) => {
      this.orders = [
        ...response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }),
      ];
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
          (item: any) => item.name === flavourToCheck.name
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
