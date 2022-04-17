import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { SearchComponent } from './components/search/search.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderRecievedComponent } from './components/order-recieved/order-recieved.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule, NgbPaginationModule,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OktaAuthModule, OktaCallbackComponent,OKTA_CONFIG, } from '@okta/okta-angular';
import myAppConfig from './Config/my-app-config';
import { Product } from './common/product';
import { MemberComponent } from './components/member/member.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HelpComponent } from './components/help/help.component';
import { ContactusComponent } from './components/contactus/contactus.component';

const route : Routes = [

  {path : 'product-details/:id' , component : ProductdetailsComponent},
  {path : 'category/:id' , component : ProductComponent},
  {path : 'search/:keyWord' , component : ProductComponent},
  {path : "cart-details", component : CartDetailsComponent},
  {path : "login/callback", component : OktaCallbackComponent},
  {path : "contact", component : ContactusComponent},
  {path : "help", component : HelpComponent},
  {path : "login", component : LoginComponent},
  {path : "orders", component : OrderHistoryComponent},
  {path : "member", component : MemberComponent},
  {path : "order-saved/:tracknumber", component : OrderRecievedComponent},
  {path : "checkout", component : CheckoutComponent},
  {path : 'products' , component : ProductComponent},
  {path : '' , redirectTo : 'products', pathMatch : 'full'},
  {path : '**' , redirectTo : 'products' , pathMatch : 'full'}
];

const oktaConfig = Object.assign({
  onAuthRequired : (injector) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

 
  
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductCategoryComponent,
    ProductdetailsComponent,
    SearchComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    OrderRecievedComponent,
    LoginComponent,
    LoginStatusComponent,
    MemberComponent,
    OrderHistoryComponent,
    HelpComponent,
    ContactusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(route),
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
  OktaAuthModule,
  ReactiveFormsModule
  ],
  providers: [ProductService,{ provide: OKTA_CONFIG, useValue: oktaConfig },
    {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptorService, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
