import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

const MATERIALS_MODULES = [MatToolbarModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, MATERIALS_MODULES],
  exports: [MATERIALS_MODULES],
})
export class SharedModule {}
