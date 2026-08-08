import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersForDriverPage } from './orders-for-driver.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersForDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersForDriverPageRoutingModule {}
