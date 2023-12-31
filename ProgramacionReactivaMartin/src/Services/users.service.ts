import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
//*- Interfaces :
import { IPost } from 'src/Interfaces/Post';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  //?- OBSERVABLES :

  //*- Creacion de Subject :
  Posts$ = new BehaviorSubject<IPost[]>([]);

  //*- Enviar los datos al Subject :
  SendPost() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((Posteos: any) => this.Posts$.next(Posteos));
  }

  //*- Obtener el Subject :
  getPost(): Subject<IPost[]> {
    return this.Posts$;
  }

  //?- PROMESAS :

  getPostPromise(): Promise<{ data: IPost[] }> {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
  }
}
