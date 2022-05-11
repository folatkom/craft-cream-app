import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Flavour } from 'src/app/shared/model/flavour';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-admin-dashboard-summary',
  templateUrl: './admin-dashboard-summary.component.html',
  styleUrls: ['./admin-dashboard-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardSummaryComponent implements OnInit {
  @Input() orders: Order[] = [];
  public allOrders: Flavour[] = [];
  public allOrdersSummary: Flavour[] = [];

  ngOnInit(): void {
    this.getAllOrders();
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
}
