import { Component } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrl: './cartlist.component.scss'
})
export class CartlistComponent {
  cart: any;
  subscription: Subscription;
  errorMessage: string;

  constructor(private service: CartService,
    private toastr: ToastrService) { }

  getCartList() {
    this.subscription = this.service.getCarts().subscribe((cartlist: any) => {
      this.cart = cartlist;
      console.log(this.cart);
    },
      (err) => {
        this.errorMessage = err.message + "Internal server issue";
      }
    );
  }

  ngOnInit(): void {
    this.getCartList();
  }

  delete(id: number) {
    if (confirm("Are you sure to delete ")) {
      this.subscription = this.service.deleteCart(id)
        .subscribe({
          next: data => {
            this.toastr.error("Cart deleted successfully.");
            this.getCartList();
          },
          error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
