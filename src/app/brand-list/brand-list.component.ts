import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandService } from '../service/brand.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss'
})
export class BrandListComponent implements OnInit, OnDestroy {
  brands: any=[];
  subscription: Subscription;
  errorMessage: string;

  constructor(private service: BrandService) { }

  ngOnInit(): void {
    this.subscription = this.service.getBrands().subscribe((brandslist:any[]) => {
      this.brands = brandslist;
      console.log(this.brands);
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
