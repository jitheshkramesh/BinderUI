import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register', 
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userForm: FormGroup;
  userNameFormControl: FormControl;
  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  subscription: Subscription;
  invalidData: boolean = false; 

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private service: AuthService,
    private toastr: ToastrService) { }

    ngOnInit(): void {


      this.userNameFormControl = new FormControl(null, [Validators.required]);
      this.firstNameFormControl = new FormControl(null, [Validators.required]);
      this.lastNameFormControl = new FormControl(null, [Validators.required]);
      this.emailFormControl = new FormControl(null, [Validators.required, Validators.email]);
      this.passwordFormControl = new FormControl(null, [Validators.required, Validators.minLength(4)]);
  
      this.userForm = this.fb.group({
        username: this.userNameFormControl,
        password: this.passwordFormControl,
        email: this.emailFormControl,
        firstName: this.firstNameFormControl,
        lastName: this.lastNameFormControl
      })
    }
  
    onSubmitForm() {
      console.log(this.userForm);
      if (this.userForm.valid) {
        this.subscription = this.service.userRegister(this.userForm.value).subscribe(res => {
          this.toastr.success('Please contact admin approval', 'Registration successfully');
          this.router.navigate(['login']);
        })
      } else {
        this.invalidData = true;
      }
  
    }
  
    resetForm() {
      console.log('reset');
      this.userForm.reset();
  
    }
  
    ngOnDestroy() {
      this.subscription && this.subscription.unsubscribe();
    }
  
    loginForm() {
      this.router.navigate(['login']);
    }
 

}
