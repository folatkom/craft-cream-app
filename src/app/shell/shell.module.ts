import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: 'customer',
            loadChildren: async () =>
              (await import('../customer/customer.module')).CustomerModule,
          },
          {
            path: 'admin',
            loadChildren: async () =>
              (await import('../admin/admin.module')).AdminDashboardModule,
          },
        ],
      },
    ]),
  ],
})
export class ShellModule {}
