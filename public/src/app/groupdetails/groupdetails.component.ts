import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-groupdetails',
  templateUrl: './groupdetails.component.html',
  styleUrls: ['./groupdetails.component.css']
})
export class GroupdetailsComponent implements OnInit {
  @Input() groupInfo: any;
  @Input() userInfo: any;
  public group: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  // Get group info based on id
  getGroupInfo(id: string) {
    let observable = this._httpService.findGroup(id);
    observable.subscribe((res) => {
      console.log('Response from server: ', res);
      if (res) {
        if (res.message === "Success") {
          this.groupInfo = res.group;
        }
      }
    });
  }

  // Allow user to join a specific group. 
  joinGroup(groupId: string) {
    console.log(groupId);
    let observable = this._httpService.addToGroup(groupId, { user: this.userInfo });
    observable.subscribe((res) => {
      console.log('Response from server: ', res);
    })
    this.getGroupInfo(this.groupInfo._id);
  }
}
