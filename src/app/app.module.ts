import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BrandComponent } from "./brand/brand.component";
import { CartlistComponent } from "./cartlist/cartlist.component";
import { CategoryComponent } from "./category/category.component";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { AuthService } from "./service/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DecimalPipe, NgFor, NgIf } from "@angular/common";
import { AppRoutingModule, routes } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HeaderComponent } from "./header/header.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { RegisterUserComponent } from "./register-user/register-user.component";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BrandComponent,
        CategoryComponent,
        ProductsComponent,
        CartlistComponent,
        ErrorComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        RegisterUserComponent
    ],
    providers: [AuthService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CommonModule,
        RouterModule,
        HttpClientModule,
        NgFor, NgIf, DecimalPipe,

        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
    ],
})
export class AppModule { }
