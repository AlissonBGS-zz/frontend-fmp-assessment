import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
  },
  {
    path: 'services/:slug', 
    component: ServicesComponent, 
  },
  { 
    path: 'checkout', 
    component: CheckoutComponent
  },
  {           
    path: '**', 
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
