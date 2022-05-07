import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

const MATERIALS_MODULES = [
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, MATERIALS_MODULES],
  exports: [MATERIALS_MODULES],
})
export class SharedModule {}
