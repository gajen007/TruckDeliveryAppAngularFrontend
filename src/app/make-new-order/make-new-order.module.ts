import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeNewOrderPageRoutingModule } from './make-new-order-routing.module';

import { MakeNewOrderPage } from './make-new-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeNewOrderPageRoutingModule
  ],
  declarations: [MakeNewOrderPage]
})
export class MakeNewOrderPageModule {}
