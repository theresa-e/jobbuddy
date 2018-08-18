import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studygroups',
  templateUrl: './studygroups.component.html',
  styleUrls: ['./studygroups.component.css']
})
export class StudygroupsComponent implements OnInit {
  user: any;
  showGroupForm: boolean;
  showGroupDetail: boolean;
  allGroups: any;
  groupToShow: any;

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkLoggedIn();
    this.showGroupForm = false;
    this.showGroupDetail = false;
    this.getAllGroups();
  }

  // Check if user is logged in 
  checkLoggedIn() {
    console.log('checking if user is logged in')
    if (!localStorage.getItem('userId')) {
      console.log("---- User is not logged in, redirecting them back to main page.");
      this._router.navigate(['/index']);
    } else {
      this.findUser(localStorage.getItem('userId'));
    }
  }

  findUser(id: string) {
    let observable = this._httpService.findUser(id);
    observable.subscribe((res) => {
      this.user = res.user;
    })
  }

  // Show new group form
  showForm() {
    this.showGroupDetail = false;
    this.showGroupForm = true;
  }

  // Get all study groups
  getAllGroups() {
    let observable = this._httpService.getGroups();
    observable.subscribe((res) => {
      console.log('Response from server: ', res)
      this.allGroups = res.groups.reverse();
    })
  }

  // Show details on study group
  showGroupDetails(group: any) {
    this.groupToShow = group;
    console.log('gonna show dis group id: ', group)
    this.showGroupForm = false;
    this.showGroupDetail = true;
  }

  hideGroupDetails() {
    this.showGroupDetail = false;
  }
}
