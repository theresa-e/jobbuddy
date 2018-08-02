import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  newJob: any;
  userId: string;
  allJobs: any;
  constructor(
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.checkLoggedIn();
    this.newJob = { title: "", desc: "", URL: "", perks: "" }
    console.log('getting jobs...')
    this.getJobs();
  }

  // Check if user is logged in
  checkLoggedIn() {
    console.log('checking if user is logged in')
    if (!localStorage.getItem('userId')) {
      console.log("---- User is not logged in, redirecting them back to main page."); 
      this._router.navigate(['/index']);
    }
  }

  // Get all jobs
  getJobs(): void { 
    let observable = this._httpService.getJobs();
    observable.subscribe((res) => {
      console.log('Response from server: ', res);
      this.allJobs = res.jobs;
    })
  }
  
  // Add job form submitted
  addJobSubmit(): void {
    console.log(this.newJob);
    this.addJob(this.newJob, this.userId);
    this.newJob = { title: "", desc: "", URL: "", perks: "" }
  }

  // Process a new job 
  addJob(newJob: any, id: string): void {
    let observable = this._httpService.createJob({ job: newJob, userId: id});
    observable.subscribe((res) => {
      console.log('response from server: ', res)
      this.getJobs()
    });
  }
}
