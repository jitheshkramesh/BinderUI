import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandService, IBrand } from '../service/brand.service';
import { Subscription } from 'rxjs'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss'
})
export class BrandListComponent implements OnInit, OnDestroy {
  brands: IBrand[]=[];
  subscription: Subscription;
  errorMessage: string;

  constructor(private service: BrandService,
    private toastr: ToastrService) { }

    getBrandList(){
      this.subscription = this.service.getBrands().subscribe((brandslist:IBrand[]) => {
        this.brands = brandslist;
        console.log(this.brands);
      },
        (err) => {
          this.errorMessage = err.message + "Internal server issue";
        }
      );
    }

  ngOnInit(): void {
    this.getBrandList();
  }

  delete(id: number) {
    if(confirm("Are you sure to delete ")) { 
      this.subscription = this.service.deleteBrand(id)
        .subscribe({
            next: data => {
              this.toastr.error("Brand deleted successfully.");
              this.getBrandList();
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
