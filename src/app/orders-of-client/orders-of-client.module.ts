import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersOfClientPageRoutingModule } from './orders-of-client-routing.module';

import { OrdersOfClientPage } from './orders-of-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersOfClientPageRoutingModule
  ],
  declarations: [OrdersOfClientPage]
})
export class OrdersOfClientPageModule {}
