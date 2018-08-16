import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser: any;
  userCredentials: any;
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  pwError: string;

  constructor(
    private _httpService: HttpService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.userCredentials = { email: "", password: "" };
    this.newUser = { firstName: "", lastName: "", email: "", password: "" };
    localStorage.clear()
  }

  registrationSubmit() {
    console.log('---- Registration form was submitted.');
    this.registerUser(this.newUser);
  }

  registerUser(user: any): void {
    let observable = this._httpService.registerUser(user);
    observable.subscribe((res: any) => {
      console.log(res)
      if (res['message'] == "Error") {
        console.log('Errors were found.')
        if (res.error.errors.firstName) {
          this.firstNameError = res.error.errors.firstName.message;
        } else {
          this.firstNameError = '';
        }
        if (res.error.errors.lastName) {
          this.lastNameError = res.error.errors.lastName.message;
        } else {
          this.lastNameError = "";
        }
        if (res.error.errors.email) {
          this.emailError = res.error.errors.email.message;
        } else {
          this.emailError = "";
        }
        if (res.error.errors.password) {
          this.pwError = res.error.errors.password.message;
        } else {
          this.pwError = "";
        }
      } else {
        // Save id in local storage and navigate them to jobs component.
        console.log("------ User registered and logged in, navigating to main page.")
        let userId = res.user._id;
        localStorage.setItem('userId', userId)
        this._router.navigate(['/main']);
      }
    })
  }
}
