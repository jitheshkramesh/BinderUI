import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService, ICategory } from '../service/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories: ICategory[] = [];
  subscription: Subscription;
  errorMessage: string;

  constructor(private service: CategoryService,
    private toastr: ToastrService,
    private router: Router) { }

  getCategoryList() {
    this.subscription = this.service.getCategories().subscribe((brandslist: ICategory[]) => {
      this.categories = brandslist;
      console.log(brandslist);
    },
      (err) => {
        this.errorMessage = err.message + "Internal server issue";
      }
    );
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  delete(id: number) {
    if (confirm("Are you sure to delete ")) {
      this.subscription = this.service.deleteCategory(id)
        .subscribe({
          next: data => {
            this.toastr.error("Category deleted successfully.");
            this.getCategoryList();
          },
          error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
          }
        });
    }
  }

  edit(id: number) {
    this.router.navigate(['/category/' + id]);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
