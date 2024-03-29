import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component"; 
import { CartlistComponent } from "./cartlist/cartlist.component"; 
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { AuthService } from "./service/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DecimalPipe, NgFor, NgIf } from "@angular/common";
import { AppRoutingModule, routes } from "./app.routes";
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HeaderComponent } from "./header/header.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { BrandListComponent } from "./brand-list/brand-list.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { authInterceptor } from "./interceptors/auth.interceptor";
import { CategoryListComponent } from "./category-list/category-list.component";
import { ProductListComponent } from "./product-list/product-list.component";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent, 
        BrandListComponent, 
        CategoryListComponent, 
        ProductListComponent,
        CartlistComponent,
        ErrorComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        RegisterUserComponent
    ],
    providers: [AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,       
        RouterModule,
        HttpClientModule,
        NgFor, NgIf, DecimalPipe,
        NgFor,
        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule
    ],
})
export class AppModule { }
