import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersForDriverPageRoutingModule } from './orders-for-driver-routing.module';

import { OrdersForDriverPage } from './orders-for-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersForDriverPageRoutingModule
  ],
  declarations: [OrdersForDriverPage]
})
export class OrdersForDriverPageModule {}
