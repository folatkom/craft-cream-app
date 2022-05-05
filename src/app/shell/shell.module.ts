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
            path: 'customer-dashboard',
            loadChildren: async () =>
              (await import('../customer-dashboard/customer-dashboard.module'))
                .CustomerDashboardModule,
          },
          {
            path: 'admin-dashboard',
            loadChildren: async () =>
              (await import('../admin-dashboard/admin-dashboard.module'))
                .AdminDashboardModule,
          },
        ],
      },
    ]),
  ],
})
export class ShellModule {}
