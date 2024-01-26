import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authenticated: boolean = false;
  authService = inject(AuthService);
  message: string;
  userName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //this.authenticated = this.authService.isAuthenticated();
    console.log('Header ngOnInit() = ' + this.authenticated);
    console.log('Header currentUserSignal = ' + this.authService.currentUserSignal());



    this.authService.loggedIn$.subscribe(c => {
      this.authenticated = c;
      console.log('isAuthenticated : ' + this.authenticated);
    });

    //this.authenticated = this.authService.isAuthenticated();
    console.log('token : ' + localStorage.getItem('token'));
    console.log('HeaderComponent ngOnInit : authenticated : ' + this.authenticated);

    this.userName = this.authService.currentUserSignal() ? this.authService.currentUserSignal()?.userName : localStorage.getItem('userName')
    if (this.authService.currentUserSignal()) {
      this.userName = this.authService.currentUserSignal()?.userName;

    }
    else {
      this.userName = localStorage.getItem('userName');
      this.message = 'C-Count : ' + localStorage.getItem('ccount');
    }
    console.log('username changed : ' + this.userName);
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logOut();
    this.authenticated = this.authService.isAuthenticated();
    this.toastr.info('Logout successfully', 'Home');
    this.router.navigate(['login']);
  }
}
