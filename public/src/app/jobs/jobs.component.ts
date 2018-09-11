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
  user: string;
  allJobs: any;
  userId: string;
  titleError: string;
  descError: string;
  urlError: string;

  constructor(
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.checkLoggedIn();
    this.newJob = { title: "", desc: "", URL: "", perks: "" }
    this.getJobs();
  }

  // Check if user is logged in
  checkLoggedIn() {
    console.log('checking if user is logged in')
    if (!localStorage.getItem('userId')) {
      console.log("---- User is not logged in, redirecting them back to main page."); 
      this._router.navigate(['/index']);
    } else {
      let observable = this._httpService.findUser(localStorage.getItem('userId'));
      observable.subscribe((res) => {
        this.user = res.user;
      });
    }
  }

  // Get all jobs
  getJobs(): void { 
    console.log('Getting jobs from server:');
    let observable = this._httpService.getJobs();
    observable.subscribe((res) => {
      console.log('Response from server getting all jobs: ', res);
      this.allJobs = res.jobs.reverse();
    });
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
      console.log('Response from server (adding job): ', res);
      if (res.message){
        if (res.message == "Error") {
          console.log(res.error);
          if (res.error.errors.description) {
            this.descError = res.error.errors.description.message;
          } if (res.error.errors.title) {
            this.titleError = res.error.errors.title.message;
          } if (res.error.errors.url) {
            this.urlError = res.error.errors.url.message;
          }
        } else {
          this.getJobs()
        }
      }
    });
  }

  // Like a job
  likeJob(job): void {
    console.log('job: ', job)
    let observable = this._httpService.addLike(this.user._id, job);
    observable.subscribe((res) => {
      console.log('Response from server (like a job): ', res);
    });
  }
}
