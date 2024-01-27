import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImageService, ImageSnippet } from '../service/image.service';
import { CategoryService } from '../service/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category', 
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  userForm!: FormGroup;
  categoryNameFormControl!: FormControl;
  categoryImageFormControl: FormControl;
  subscription: Subscription;

  brandImage: ImageSnippet;
  file: File;
  productImage: any;

  bImage: File;
  EditProductCode = '';


  constructor(private fb: FormBuilder,
    private imageService: ImageService,
    private service: CategoryService,
    private toastr: ToastrService) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.categoryNameFormControl = new FormControl(null, [Validators.required]);

    this.userForm = this.fb.group({
      CategoryName: this.categoryNameFormControl,
      CategoryImageUrl: this.categoryImageFormControl 
    })
  }

  onSubmitForm() {

    console.log(this.userForm.value);
    console.log(this.productImage.value);
    this.userForm.patchValue({
      CategoryName: this.categoryNameFormControl.value,
      CategoryImageUrl: this.file.name
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

      this.service.postCategory(this.userForm.value).subscribe(data => {
        this.toastr.info("Category created successfully.");
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
