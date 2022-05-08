import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomerOrderContainerComponent } from './customer-order-container/customer-order-container.component';
import { CustomerOrderFlavourComponent } from './customer-order-flavour/customer-order-flavour.component';

@NgModule({
  declarations: [CustomerComponent, CustomerOrderContainerComponent, CustomerOrderFlavourComponent],
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
