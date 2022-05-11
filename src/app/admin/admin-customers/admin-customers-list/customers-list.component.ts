import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-admin-customers-list',
  templateUrl: './admin-customers-list.component.html',
  styleUrls: ['./admin-customers-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomersListComponent {
  @Input() customers: any;
}
