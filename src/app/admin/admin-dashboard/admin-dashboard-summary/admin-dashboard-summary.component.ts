import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Flavour } from 'src/app/shared/model/flavour';
@Component({
  selector: 'app-admin-dashboard-summary',
  templateUrl: './admin-dashboard-summary.component.html',
  styleUrls: ['./admin-dashboard-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardSummaryComponent {
  @Input() allOrdersSummary: Flavour[] = [];
}
