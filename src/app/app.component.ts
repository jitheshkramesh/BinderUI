import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'BinderUI';
  showHead: boolean = false;
  displayLoadingIndicator: boolean = false;

  constructor(private router: Router) {
   // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/register') {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.displayLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd
        || routerEvent instanceof NavigationCancel
        || routerEvent instanceof NavigationError) {
        this.displayLoadingIndicator = false;
      }
    });
  }
}
