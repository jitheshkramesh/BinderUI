import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-list', 
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
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
