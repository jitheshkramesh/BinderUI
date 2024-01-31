import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageService, ImageSnippet } from '../service/image.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BrandService, IBrand, ServiceTypeEdit } from '../service/brand.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit, OnDestroy {

  userForm!: FormGroup;
  subscription: Subscription;
  isAddMode: boolean;
  id: number;

  brandImage: ImageSnippet;
  file: File;
  productImage: any;
  productImageUrl: any;

  bImage: File;
  EditProductCode = '';
  brand: IBrand;
  isImageEdit: boolean;


  constructor(private fb: FormBuilder,
    private imageService: ImageService,
    private service: BrandService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.userForm = this.fb.group({
      brandName: '',
      brandImageUrl: ''
    });

    if (!this.isAddMode) {
      this.getBrand(this.id);
    }
  }

  getBrand(id: number) {
    this.subscription = this.service.getBrand(id).subscribe((item: ServiceTypeEdit) => {
      const cat: IBrand = {
        id: item.result?.id,
        brandName: item.result?.brandName,
        brandImageUrl: item.result?.brandImageUrl
      }
      this.productImage = this.service.imagePath + item.result?.brandImageUrl;
      this.productImageUrl = item.result?.brandImageUrl;
      this.userForm.patchValue(cat);
      console.log(item);
    },
      (err) => {
        this.toastr.error("Error.");
      }
    );
  }

  onSubmitForm() {

    console.log(this.userForm.value);
    console.log(this.productImage.value);

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

      const brand: IBrand = {
        id: this.id,
        brandName: this.userForm.value.brandName,
        brandImageUrl: this.isImageEdit ? this.file.name : this.productImageUrl
      }

      if (this.isAddMode) this.addBrand(brand);
      else this.updateBrand(brand);
    };
  }

  addBrand(cat: IBrand) {
    this.service.postBrand(cat).subscribe(data => {
      this.toastr.success("Brand created successfully.");
    }, err => {
      this.toastr.error("Error.");
    });
  }

  updateBrand(cat: IBrand) {
    this.userForm.patchValue(cat);
    this.service.postBrand(cat).subscribe(data => {
      this.toastr.success("Brand updated successfully.");
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
