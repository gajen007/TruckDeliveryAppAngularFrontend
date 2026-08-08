import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  */
  {
    path: '',
    redirectTo: 'front',
    pathMatch: 'full'
  },
  {
    path: 'login/:userType',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'front',
    loadChildren: () => import('./front/front.module').then( m => m.FrontPageModule)
  },
  {
    path: 'staff-home',
    loadChildren: () => import('./staff-home/staff-home.module').then( m => m.StaffHomePageModule)
  },
  {
    path: 'client-home',
    loadChildren: () => import('./client-home/client-home.module').then( m => m.ClientHomePageModule)
  },
  {
    path: 'driver-home',
    loadChildren: () => import('./driver-home/driver-home.module').then( m => m.DriverHomePageModule)
  },
  {
    path: 'trucks',
    loadChildren: () => import('./trucks/trucks.module').then( m => m.TrucksPageModule)
  },
  {
    path: 'drivers',
    loadChildren: () => import('./drivers/drivers.module').then( m => m.DriversPageModule)
  },
  {
    path: 'orders-for-staff',
    loadChildren: () => import('./orders-for-staff/orders-for-staff.module').then( m => m.OrdersForStaffPageModule)
  },
  {
    path: 'orders-for-driver',
    loadChildren: () => import('./orders-for-driver/orders-for-driver.module').then( m => m.OrdersForDriverPageModule)
  },
  {
    path: 'orders-of-client',
    loadChildren: () => import('./orders-of-client/orders-of-client.module').then( m => m.OrdersOfClientPageModule)
  },
  {
    path: 'add-new-truck',
    loadChildren: () => import('./add-new-truck/add-new-truck.module').then( m => m.AddNewTruckPageModule)
  },
  {
    path: 'make-new-order',
    loadChildren: () => import('./make-new-order/make-new-order.module').then( m => m.MakeNewOrderPageModule)
  },
  {
    path: 'single-order/:orderID',
    loadChildren: () => import('./single-order/single-order.module').then( m => m.SingleOrderPageModule)
  },
  /*
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
