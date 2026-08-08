import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersForStaffPageRoutingModule } from './orders-for-staff-routing.module';

import { OrdersForStaffPage } from './orders-for-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersForStaffPageRoutingModule
  ],
  declarations: [OrdersForStaffPage]
})
export class OrdersForStaffPageModule {}
