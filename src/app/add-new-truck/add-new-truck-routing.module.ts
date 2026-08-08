import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewTruckPage } from './add-new-truck.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewTruckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewTruckPageRoutingModule {}
