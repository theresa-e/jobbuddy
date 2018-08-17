import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-studygroupform',
  templateUrl: './studygroupform.component.html',
  styleUrls: ['./studygroupform.component.css']
})
export class StudygroupformComponent implements OnInit {
  @Input() userInfo: any;
  @Output() getGroups = new EventEmitter();
  studyGroup: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    console.log('user info yo ', this.userInfo);
    this.studyGroup = {
      name: "",
      date: "",
      location: "",
      time: "",
      description: "",
      created_by: this.userInfo
    }
  }

  // Create a new group
  createGroup(studyGroup: any) {
    let observable = this._httpService.createGroup(studyGroup);
    observable.subscribe((res) => {
      console.log('Response from server: ', res);
    })
  }

  // New group form is submitted.
  submitGroup() {
    console.log('submit group ==>', this.studyGroup)
    this.createGroup(this.studyGroup);
    this.getGroups.emit(null);
    this.studyGroup = {
      name: "",
      date: "",
      location: "",
      time: "",
      description: "",
      created_by: this.userInfo
    }
  }
}
