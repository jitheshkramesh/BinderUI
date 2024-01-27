import { Component } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cartlist', 
  templateUrl: './cartlist.component.html',
  styleUrl: './cartlist.component.scss'
})
export class CartlistComponent {
  categories: any=[];
  subscription: Subscription;
  errorMessage: string;

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.subscription = this.service.getCategories().subscribe((brandslist:any[]) => {
      this.categories = brandslist;
      console.log(this.categories);
    },
      (err) => {
        this.errorMessage = err.message + "Internal server issue";
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
