import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminOfferComponent } from './admin-offer/admin-offer.component';
import { AdminCustomersFormComponent } from './admin-customers/admin-customers-form/admin-customers-form.component';
import { AdminCustomersListComponent } from './admin-customers/admin-customers-list/customers-list.component';
import { AdminDashboardSummaryComponent } from './admin-dashboard/admin-dashboard-summary/admin-dashboard-summary.component';
import { AdminDashboardOrdersComponent } from './admin-dashboard/admin-dashboard-orders/admin-dashboard-orders.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminCustomersComponent,
    AdminOfferComponent,
    AdminCustomersFormComponent,
    AdminCustomersListComponent,
    AdminDashboardSummaryComponent,
    AdminDashboardOrdersComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: 'dashboard',
            component: AdminDashboardComponent,
          },
          {
            path: 'customers',
            component: AdminCustomersComponent,
          },
          {
            path: 'offer',
            component: AdminOfferComponent,
          },
        ],
      },
    ]),
  ],
})
export class AdminDashboardModule {}
