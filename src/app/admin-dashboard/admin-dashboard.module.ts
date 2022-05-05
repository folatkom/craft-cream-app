import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard.component';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminDashboardComponent,
      },
    ]),
  ],
})
export class AdminDashboardModule {}
