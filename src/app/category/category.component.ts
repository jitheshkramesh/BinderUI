import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImageService, ImageSnippet } from '../service/image.service';
import { CategoryService, ICategory, ServiceType, ServiceTypeEdit } from '../service/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
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
  category: ICategory;
  isImageEdit: boolean;


  constructor(private fb: FormBuilder,
    private imageService: ImageService,
    private service: CategoryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.userForm = this.fb.group({
      categoryName: '',
      CategoryImageUrl: ''
    });

    if (!this.isAddMode) {
      this.getCategory(this.id);
    }
  }

  getCategory(id: number) {
    this.subscription = this.service.getCategory(id).subscribe((item: ServiceTypeEdit) => {
      const cat: ICategory = {
        id: item.result?.id,
        categoryName: item.result?.categoryName,
        categoryImageUrl: item.result?.categoryImageUrl
      }
      this.productImage = this.service.imagePath + item.result?.categoryImageUrl;
      this.productImageUrl = item.result?.categoryImageUrl;
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
    // this.userForm.patchValue({
    //   CategoryName: this.categoryNameFormControl.value,
    //   CategoryImageUrl: this.file.name
    // });
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

      const cat: ICategory = {
        id: this.id,
        categoryName: this.userForm.value.categoryName,
        categoryImageUrl: this.isImageEdit ? this.file.name : this.productImageUrl
      }

      if (this.isAddMode) this.addCategory(cat);
      else this.updateCategory(cat);
    };
  }

  addCategory(cat: ICategory) {
    this.service.postCategory(cat).subscribe(data => {
      this.toastr.success("Category created successfully.");
      this.router.navigate(['categorylist']);
    }, err => {
      this.toastr.error("Error.");
    });
  }

  updateCategory(cat: ICategory) {
    this.userForm.patchValue(cat);
    this.service.postCategory(cat).subscribe(data => {
      this.toastr.success("Category updated successfully.");
      this.router.navigate(['categorylist']);
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

  backToList(){
    this.router.navigate(['categorylist']);
  }

}
