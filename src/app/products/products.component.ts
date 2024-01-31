import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageService, ImageSnippet } from '../service/image.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService, ServiceTypeEdit } from '../service/product.service';
import { CategoryService, ICategory } from '../service/category.service';
import { BrandService, IBrand } from '../service/brand.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  userForm!: FormGroup;
  subscription: Subscription;
  categoryVal: string;
  brandVal: string;
  isAddMode: boolean;
  id: number;

  brandImage: ImageSnippet;
  file: File;
  productImage: any;
  productImageUrl: any;

  bImage: File;
  EditProductCode = '';
  categories: ICategory[] = [];
  brands: IBrand[] = [];
  isImageEdit: boolean;

  constructor(private fb: FormBuilder,
    private imageService: ImageService,
    private service: ProductService,
    private brandservice: BrandService,
    private categoryservice: CategoryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.getCategoryList();
    this.getBrandList();


    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.userForm = this.fb.group({
      productName: '',
      productImageUrl: '',
      productDescription: '',
      productPrice: '',
      productStock: '',
      categoryId: '',
      brandId: ''
    });

    if (!this.isAddMode) {
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    console.log('getProduct');
    this.subscription = this.service.getProduct(id).subscribe((item: ServiceTypeEdit) => {
      console.log(item);
      console.log('brandId', item.result?.brandId);
      const cat: any = {
        id: item.result?.id,
        productName: item.result?.productName,
        productPrice: item.result?.productPrice,
        productStock: item.result?.productStock,
        productDescription: item.result?.productDescription,
        categoryId: item.result?.categoryId,
        brandId: item.result?.brandId
      }
      this.productImage = this.service.imagePath + item.result?.productImageUrl;
      this.productImageUrl = item.result?.productImageUrl;
      this.userForm.patchValue(cat);
      console.log(item);
    },
      (err) => {
        this.toastr.error("Error.");
      }
    );
  }

  getCategoryList() {
    this.subscription = this.categoryservice.getCategories().subscribe((brandslist: ICategory[]) => {
      this.categories = brandslist;
      console.log(brandslist);
    },
      (err) => {
        this.toastr.error("Error.");
      }
    );
  }

  getBrandList() {
    this.subscription = this.brandservice.getBrands().subscribe((brandslist: IBrand[]) => {
      this.brands = brandslist;
      console.log(this.brands);
    },
      (err) => {
        this.toastr.error("Error.");
      }
    );
  }

  onCategoryChange() {
    this.categoryVal = this.userForm.value.categoryId;
  }

  onBrandChange() {
    this.brandVal = this.userForm.value.brandId;
  }

  onSubmitForm() {

    console.log(this.userForm.value);
    console.log(this.productImage.value);
    this.userForm.patchValue({
      id: this.id,
      productName: this.userForm.value.productName,
      productDescription: this.userForm.value.productDescription,
      productPrice: this.userForm.value.productPrice,
      productStock: this.userForm.value.productStock,
      categoryId: this.categoryVal,
      brandId: this.brandVal,
      productImageUrl: this.isImageEdit ? this.file.name : this.productImageUrl
    });
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      if (this.isImageEdit) {
        const formdata = new FormData();
        formdata.append("file", this.file, this.file.name);

        this.subscription = this.service.uploadImage(formdata).subscribe(res => {
          console.log('image uploaded');
        }, err => {
          this.toastr.error("Error.");
        });
      }

      
    };

      const prod: any = {
        id: this.id,
        productName: this.userForm.value.productName,
        productImageUrl: this.isImageEdit ? this.file.name : this.productImageUrl,
        productDescription: this.userForm.value.productDescription,
        productPrice: this.userForm.value.productPrice,
        productStock: this.userForm.value.productStock,
        categoryId: this.categoryVal,
        brandId: this.brandVal,
      }

      if (this.isAddMode) this.addProduct(prod);
      else this.updateProduct(prod);

  }

  addProduct(prod: any) {
    this.service.postProduct(this.userForm.value).subscribe(data => {
      this.toastr.success("Product created successfully.");
    }, err => {
      this.toastr.error("Error.");
    });
  }

  updateProduct(prod: any) {
    this.userForm.patchValue(prod);
    this.service.postProduct(prod).subscribe(data => {
      this.toastr.success("Product updated successfully.");
    }, err => {
      this.toastr.error("Error.");
    });
  }

  resetForm() {
    this.userForm.reset();
  }

  onchange(event: any) {
    this.isImageEdit = true;
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.productImage = reader.result;
    }
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  get f() { return this.userForm.controls; }

}
