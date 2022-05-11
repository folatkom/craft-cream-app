import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomerOrderContainerComponent } from './customer-order/customer-order-container/customer-order-container.component';
import { CustomerOrderFlavourComponent } from './customer-order/customer-order-flavour/customer-order-flavour.component';
import { CustomerOfferComponent } from './customer-offer/customer-offer.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerOrderContainerComponent,
    CustomerOrderFlavourComponent,
    CustomerOfferComponent,
    CustomerOrderComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerComponent,
      },
    ]),
  ],
})
export class CustomerModule {}
