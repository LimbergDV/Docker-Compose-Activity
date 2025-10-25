import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { ViewCarsComponent } from './cars/view-cars/view-cars.component';
import { ViewRentsComponent } from './rents/view-rents/view-rents.component';

const routes: Routes = [
  {path:'Clientes', component:ViewCustomerComponent},
  {path:'Autos', component: ViewCarsComponent},
  {path: 'Rentas', component: ViewRentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
