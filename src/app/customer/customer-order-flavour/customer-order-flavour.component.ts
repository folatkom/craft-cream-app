import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ChosenFlavour, ChosenContainer } from '../customer.component';

@Component({
  selector: 'app-customer-order-flavour',
  templateUrl: './customer-order-flavour.component.html',
  styleUrls: ['./customer-order-flavour.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrderFlavourComponent {
  @Input() flavourName = '';
  @Input() containers: ChosenContainer[] = [
    {
      name: '',
      quantity: 0,
    },
  ];
  @Output() flavour = new EventEmitter<ChosenFlavour>();

  public chosenFlavour: ChosenFlavour = {
    name: '',
    containers: [],
  };
  emitFlavour() {
    this.flavour.emit(this.chosenFlavour);
  }
  getContainersChoice(quantity: number, containerName: string) {
    this.chosenFlavour.name = this.flavourName;
    this.chosenFlavour.containers = this.chosenFlavour.containers.filter(
      (item) => item.name !== containerName
    );
    this.chosenFlavour.containers.push({
      name: containerName,
      quantity: quantity,
    });

    this.emitFlavour();
  }
}
