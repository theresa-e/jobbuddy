import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-groupdetails',
  templateUrl: './groupdetails.component.html',
  styleUrls: ['./groupdetails.component.css']
})
export class GroupdetailsComponent implements OnInit {
@Input() groupInfo: any;
  constructor() { }

  ngOnInit() {
    console.log(this.groupInfo)
  }

}
