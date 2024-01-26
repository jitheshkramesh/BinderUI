import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { userInterface } from '../interfaces/auth.interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userForm!: FormGroup;
  userNameFormControl!: FormControl;
  passwordFormControl!: FormControl;
  subscription: Subscription | undefined;
  invalidData: boolean = false;
  result: any;
  user: userInterface | undefined;

  constructor(private fb: FormBuilder,
    private router: Router,
    private service: AuthService,
    private authService: AuthService,
    private toastr: ToastrService) { }

    
  ngOnInit(): void {


    this.userNameFormControl = new FormControl(null, [Validators.required]);
    this.passwordFormControl = new FormControl(null, [Validators.required, Validators.minLength(4)]);

    this.userForm = this.fb.group({
      username: this.userNameFormControl,
      password: this.passwordFormControl
    })
  }

  onSubmitForm() {
    console.log(this.userForm);
    if (this.userForm.valid) {
      this.subscription = this.service.userLogin(this.userForm.value).subscribe(res => {
        //this.toastr.success('Please contact admin approval', 'Registration successfully');
        this.result = res;
        this.authService.logIn();
        //this.authenticated = this.authService.isAuthenticated();
        localStorage.setItem('token', this.result.token);
        localStorage.setItem('userName', this.userNameFormControl.value);
        this.user = { userName: this.userNameFormControl.value };

        this.authService.currentUserSignal.set(this.user);

        this.toastr.success('Logined successfully','Login Page');

        console.log('login currentUserSignal = ' + this.authService.currentUserSignal());

        this.router.navigate(['home']);
      }, err => {
        this.toastr.error('Error', 'Invalid credential');
      });
    } else {
      this.invalidData = true;
      this.toastr.error('Error', 'Server error');
    }
  }

  resetForm() {
    console.log('reset');
    this.userForm.reset();

  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  registerForm() {
    this.router.navigate(['register']);
  }
  registerFormUser(){
    this.router.navigate(['registerUser']);
  }
    
}
