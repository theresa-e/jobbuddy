import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public isLoggedIn: boolean;
  public user: any;

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.checkLoggedIn();
  }

  // Check if user is logged in 
  checkLoggedIn() {
    if (!localStorage.getItem('userId')) {
      console.log("---- User is not logged in, redirecting them back to main page.");
      this.isLoggedIn = false;
      this._router.navigate(['/index']);

    } else {
      this.findUser(localStorage.getItem('userId'));
      this.isLoggedIn = true;
    }
  }

  // Find user based on id
  findUser(id: string) {
    let observable = this._httpService.findUser(id);
    observable.subscribe((res: any) => {
      if (res.message === "Success") {
        this.user = res.user;
        console.log('------ User found: ', this.user);
      }
    })
  }

  // Log user out.
  logout(){
    console.log('----- User will be logged out.')
    localStorage.setItem('userId', '');
    this.isLoggedIn = false;
    this._router.navigate(['/index']);
  }
}
