import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-customers-list',
  templateUrl: './admin-customers-list.component.html',
  styleUrls: ['./admin-customers-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomersListComponent implements OnInit {
  public customers: any = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers() {
    this.apiService.getData('users').subscribe(
      (res) =>
        (this.customers = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        }))
    );
  }
}
