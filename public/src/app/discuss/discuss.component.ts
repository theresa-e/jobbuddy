import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiscussService } from './../discuss.service';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.css'],
  providers: [DiscussService]
})

export class DiscussComponent implements OnInit {
  message: any;
  connection;
  messages: any;
  userId: string;
  userInfo: any;

  constructor(
    private discussService: DiscussService,
    private httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkLoggedIn();
    this.setMessages();
    this.getUserInfo();
    this.message = {name: "", content: ""};
  }

  // Check if user is logged in 
  checkLoggedIn() {
    console.log('checking if user is logged in')
    if (!localStorage.getItem('userId')) {
      console.log("---- User is not logged in, redirecting them back to main page.");
      this._router.navigate(['/index']);
    } else {
      this.userId = localStorage.getItem('userId');
      console.log(this.userId);
    }
  }

  // Get user info 
  getUserInfo() {
    let observable = this.httpService.findUser(this.userId);
    observable.subscribe(res => {
      console.log('Response from service: ', res);
      this.userInfo = res['user'];
      this.message.name = this.userInfo.firstName;
    })
  }

  setMessages() {
    this.connection = this.discussService.getMessages().subscribe(message => {
      console.log(message)
      this.messages = message;
    });
  }

  sendMessage() {
    console.log(this.userInfo)
    this.discussService.sendMessage(this.message);
    this.message.content = "";
  }

  // Socket disconnects when user leaves page
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
