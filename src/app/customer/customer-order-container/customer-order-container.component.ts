import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

//import { ChosenContainer } from '../customer.component';

@Component({
  selector: 'app-customer-order-container',
  templateUrl: './customer-order-container.component.html',
  styleUrls: ['./customer-order-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrderContainerComponent {
  @Input() containerName = '';
  @Output() containerQuantity = new EventEmitter<number>();
  public quantity = 0;

  public plusOne() {
    this.quantity++;
    this.containerQuantity.emit(this.quantity);
  }
  public minusOne() {
    if (this.quantity > 0) {
      this.quantity--;
      this.containerQuantity.emit(this.quantity);
    }
  }
}
