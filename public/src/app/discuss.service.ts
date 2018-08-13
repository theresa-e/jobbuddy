import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class DiscussService {
  private url = "http://localhost:7000";
  private socket;

  constructor() { }

  sendMessage(message) {
    this.socket.emit('chat message', message);
    console.log('this is socket: ', this.socket);
  }

  getMessages(){
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => { 
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }
}
