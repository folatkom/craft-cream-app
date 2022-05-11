import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Flavour, Container } from 'src/app/shared/model/flavour';

@Component({
  selector: 'app-customer-order-flavour',
  templateUrl: './customer-order-flavour.component.html',
  styleUrls: ['./customer-order-flavour.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrderFlavourComponent {
  @Input() flavourName = '';
  @Input() containers: Container[] = [];
  @Output() flavour = new EventEmitter<Flavour>();

  public chosenFlavour: Flavour = {
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
    if (quantity !== 0) {
      this.chosenFlavour.containers.push({
        name: containerName,
        quantity: quantity,
      });
    }
    this.emitFlavour();
  }
}
