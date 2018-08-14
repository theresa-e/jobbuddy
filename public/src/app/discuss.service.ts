import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class DiscussService {
  private url = "http://localhost:7000";
  private socket;

  constructor() { }

  sendMessage(message) {
    this.socket.emit('chat message', message);
    console.log('------ Socket: ', this.socket);
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('messages', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }

  addActiveUser(user) {
    this.socket.emit('userInfo', user);
    console.log('------ Added a new user: ', user);
    this.socket.on('activeUsers', (data) => {
      
    })
  }

  getActiveUsers() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('activeUsers', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }
}