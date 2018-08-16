import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() loginFormShowing: boolean;
  loginError: string;
  newUser: any;
  userCredentials: any;
  
  constructor(
    private _httpService: HttpService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.userCredentials = { email: "", password: "" };
    this.newUser = { firstName: "", lastName: "", email: "", password: "" };
    localStorage.clear()
  }

  loginSubmit() {
    console.log('---- Login form was submitted.');
    this.loginUser(this.userCredentials);
  }

  loginUser(user: any) {
    let observable = this._httpService.loginUser(user);
    observable.subscribe((res: any) => {
      console.log(res)
      if (res.message == "Error") {
        this.loginError = res.error_msg;
      } else {
        // Save the user id in localstorage
        console.log("------ User logged in, navigating to main page.")
        let userId = res.user._id;
        localStorage.setItem('userId', userId);
        this._router.navigate(['/main']);
      }
    })
  }
}
