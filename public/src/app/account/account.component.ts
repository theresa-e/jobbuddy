import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
public user: any;

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.checkLoggedIn();
  }

  // Check if user is logged in 
  checkLoggedIn() {
    if (!localStorage.getItem('userId')) {
      console.log("---- User is not logged in, redirecting them back to main page.");
      this._router.navigate(['/index']);
    } else {
      this.findUser(localStorage.getItem('userId'));
    }
  }

  // Find user based on id
  findUser(id: string) {
    let observable = this._httpService.findUser(id);
    observable.subscribe((res) => {
      this.user = res.user;
    })
  }
}
