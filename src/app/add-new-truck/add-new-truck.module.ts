import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewTruckPageRoutingModule } from './add-new-truck-routing.module';

import { AddNewTruckPage } from './add-new-truck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewTruckPageRoutingModule
  ],
  declarations: [AddNewTruckPage]
})
export class AddNewTruckPageModule {}
