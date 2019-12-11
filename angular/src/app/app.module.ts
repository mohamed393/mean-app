import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { DataTableModule } from 'ng-angular8-datatable';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ManageproductsComponent } from './admin/manageproducts/manageproducts.component';
import { AuthguardService } from './services/authguard.service';
import { NoaccessComponent } from './noaccess/noaccess.component';
import { AdminguardService } from './services/adminguard.service';
import { CategoryComponent } from './admin/category/category.component';
import { NewproductComponent } from './admin/newproduct/newproduct.component';
import { CategoryService } from './services/category.service';
import { CustomFormsModule } from 'ng2-validation';
import { CardComponent } from './card/card.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { OneproductComponent } from './oneproduct/oneproduct.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    NewaccountComponent,
    ManageproductsComponent,
    NoaccessComponent,
    CategoryComponent,
    NewproductComponent,
    CardComponent,
    ShoppingcartComponent,
    OneproductComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DataTableModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShowHidePasswordModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent }
      , { path: 'login', component: LoginComponent }
      , { path: 'newaccount', component: NewaccountComponent }
      , { path: 'noaccess', component: NoaccessComponent }
      , { path: 'shop-cart', component: ShoppingcartComponent }
      , { path: 'oneproduct/:id', component: OneproductComponent }
      , {
        path: 'admin/manage', component: ManageproductsComponent
        , canActivate: [AuthguardService, AdminguardService]
      }
      , {
        path: 'admin/manage/newcategory', component: CategoryComponent
        , canActivate: [AuthguardService, AdminguardService]
      }
      , {
        path: 'admin/manage/newproduct', component: NewproductComponent
        , canActivate: [AuthguardService, AdminguardService]
      }
      , {
        path: 'admin/manage/newproduct/:id', component: NewproductComponent
        , canActivate: [AuthguardService, AdminguardService]
      }

    ])

  ],
  providers: [UserService, AuthService, AuthguardService, AdminguardService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
