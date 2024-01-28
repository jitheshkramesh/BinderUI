import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageService, ImageSnippet } from '../service/image.service';
import { BrandService } from '../service/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products', 
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  userForm!: FormGroup;
  brandNameFormControl!: FormControl;
  brandImageFormControl: FormControl;
  subscription: Subscription;

  brandImage: ImageSnippet;
  file: File;
  productImage: any;

  bImage: File;
  EditProductCode = '';


  constructor(private fb: FormBuilder,
    private imageService: ImageService,
    private service: BrandService,
    private toastr: ToastrService) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.brandNameFormControl = new FormControl(null, [Validators.required]);

    this.userForm = this.fb.group({
      BrandName: this.brandNameFormControl,
      BrandImageUrl: this.brandImageFormControl 
    })
  }

  onSubmitForm() {

    console.log(this.userForm.value);
    console.log(this.productImage.value);
    this.userForm.patchValue({
      BrandName: this.brandNameFormControl.value,
      BrandImageUrl: this.file.name
    });
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      const formdata = new FormData(); 
      formdata.append("file", this.file, this.file.name);

      this.subscription = this.service.uploadImage(formdata).subscribe(res => {
        console.log('image uploaded');
      }, err => {
        this.toastr.error("Error.");
      });

      this.service.postBrand(this.userForm.value).subscribe(data => {
        this.toastr.info("Brand created successfully.");
      }, err => {
        this.toastr.error("Error.");
      });
    };
  }

  resetForm() {
    this.userForm.reset();
  }

  onchange(event: any) {
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
}
