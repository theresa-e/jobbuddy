import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  // Process new user registration
  registerUser(user: any) {
    return this._http.post('/api/register', user);
  }

  // Process user login request
  loginUser(user: any) {
    return this._http.post('/api/login', user);
  }

  // Create new job posting
  createJob(job: any) {
    return this._http.post('/api/jobs', job);
  }

  // Retrieve all jobs
  getJobs() {
    return this._http.get('/api/jobs');
  }

  // Find a user by their ID
  findUser(id: string) {
    return this._http.get('/api/user/' + id);
  }

  // Like a job
  addLike(userId: string, job) {
    return this._http.post('/api/jobs/' + userId, job);
  }

  // Create a new study group
  createGroup(group: any) {
    return this._http.post('/api/groups', group);
  }

  // Retrieve all groups
  getGroups() {
    return this._http.get('/api/groups');
  }

  // Find group by ID
  findGroup(id: string) {
    return this._http.get('/api/groups/' + id);
  }

  // Add user as attending a study group
  addToGroup(id: string, user) {
    return this._http.post('/api/groups/' + id, user);
  }
}
