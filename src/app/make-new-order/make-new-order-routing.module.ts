import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeNewOrderPage } from './make-new-order.page';

const routes: Routes = [
  {
    path: '',
    component: MakeNewOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeNewOrderPageRoutingModule {}
