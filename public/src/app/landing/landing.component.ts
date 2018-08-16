import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  loginFormShowing: boolean;
  regFormShowing: boolean;

  constructor() { }

  ngOnInit() {
    this.loginFormShowing = false;
    this.regFormShowing = false;
  }

  showLoginForm() {
    this.regFormShowing = false;
    this.loginFormShowing = true;
  }

  showRegForm() {
    this.loginFormShowing = false;
    this.regFormShowing = true;
  }
}