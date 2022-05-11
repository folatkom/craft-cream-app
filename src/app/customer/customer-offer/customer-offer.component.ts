import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Flavour } from 'src/app/shared/model/flavour';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-customer-offer',
  templateUrl: './customer-offer.component.html',
  styleUrls: ['./customer-offer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOfferComponent {
  @Input() flavours: Flavour[] = [];
  @Input() containers: any = [];
  @Input() favourites: any = [];
  @Input() uid = '';
  @Output() clickButton = new EventEmitter<void>();

  constructor(private apiService: ApiService) {}

  addToFavourites(flavour: any) {
    const flavourToAdd = {
      name: flavour.name,
    };
    this.apiService.addData(flavourToAdd, `users/${this.uid}/favourites`).then(
      (res) => {
        alert('Dodano do ulubionych');
      },
      (err) => {
        alert(err.message);
      }
    );
    this.clickButton.emit();
  }

  deleteFavourites(flavour: string) {
    const favouriteToDelete = this.favourites.filter(
      (item: any) => item.name === flavour
    );
    this.apiService.deleteData(
      favouriteToDelete[0].id,
      `users/${this.uid}/favourites`
    );
    this.clickButton.emit();
  }

  isFavourite(flavour: string): boolean {
    return this.favourites.some((item: any) => item.name === flavour);
  }
}
