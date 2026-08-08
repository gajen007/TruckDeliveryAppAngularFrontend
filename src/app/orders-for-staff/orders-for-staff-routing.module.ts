import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersForStaffPage } from './orders-for-staff.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersForStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersForStaffPageRoutingModule {}
