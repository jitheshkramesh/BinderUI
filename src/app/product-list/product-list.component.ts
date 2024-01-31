import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService, ProductServiceType } from '../service/product.service';
import { Subscription } from 'rxjs';
import { CartService, CartUpdate } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: any;
  subscription: Subscription;
  errorMessage: string;

  constructor(private service: ProductService,
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService) { }

  getProductList() {
    this.subscription = this.service.getProducts().subscribe((productlist: ProductServiceType) => {
      this.products = productlist;
      console.log(productlist);
    },
      (err) => {
        this.errorMessage = err.message + "Internal server issue";
      }
    );
  }

  ngOnInit(): void {
    this.getProductList();
  }

  delete(id: number) {
    if (confirm("Are you sure to delete ")) {
      this.subscription = this.service.deleteProduct(id)
        .subscribe({
          next: data => {
            this.toastr.error("Product deleted successfully.");
            this.getProductList();
          },
          error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
          }
        });
    }
  }

  cartAdd(id: number) {
    const cartUpdate: CartUpdate = { productId: id, quantity: 1 };

    this.subscription = this.cartService.postCart(cartUpdate)
      .subscribe({
        next: data => {
          this.toastr.success("Cart added successfully.");
          this.router.navigate(['/carts']);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  edit(id: number) {
    this.router.navigate(['/products/' + id]);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
