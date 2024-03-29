import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { CartlistComponent } from './cartlist/cartlist.component';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthguardService } from './service/authguard.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'registerUser', component: RegisterUserComponent },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'brand', loadComponent: () => import('./brand/brand.component').then((m) => m.BrandComponent), canActivate: [AuthguardService] },
    { path: 'brand/:id', component: BrandComponent, canActivate: [AuthguardService] },
    { path: 'category', loadComponent: () => import('./category/category.component').then((m) => m.CategoryComponent), canActivate: [AuthguardService] },
    { path: 'category/:id', component: CategoryComponent, canActivate: [AuthguardService] },
    { path: 'categorylist', component: CategoryListComponent, canActivate: [AuthguardService] },
    { path: 'products', loadComponent: () => import('./products/products.component').then((m) => m.ProductsComponent), canActivate: [AuthguardService] },
    { path: 'products/:id', component: ProductsComponent, canActivate: [AuthguardService] },
    { path: 'brandlist', component: BrandListComponent, canActivate: [AuthguardService] },
    { path: 'productlist', component: ProductListComponent, canActivate: [AuthguardService] },
    { path: 'carts', component: CartlistComponent, canActivate: [AuthguardService] },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
