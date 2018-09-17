import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn = false;

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkLoggedIn();
  }

  // Check if user is logged in 
  checkLoggedIn() {
    console.log('checking if user is logged in')
    if (!localStorage.getItem('userId')) {
      console.log("---- User is not logged in, redirecting them back to main page.");
      this.isLoggedIn = false;
      this._router.navigate(['/index']);
    } else {
      this.isLoggedIn = true;
    }
  }
}
