import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/Services/users.service';
import { Observable, map, pipe, Subject, Subscription } from 'rxjs';
//*- Interfaces :
import { IPost } from 'src/Interfaces/Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private ServicioUsuario: UsersService) {}

  //?- SUBJECT :

  PostSubject$!: Subject<IPost[]>;

  //?- SUSCRIPTION :

  Suscription: Subscription = new Subscription();

  //?- OBSERVABLE :

  PostObservable$!: Observable<IPost[]>;

  //?- PROMESADATA :

  PostPromise: IPost[] = [];

  ngOnInit(): void {
    //*- Observable :

    this.PostSubject$ = this.ServicioUsuario.getPost();

    //*- Tranformamos el Subject a un Observable :
    this.PostObservable$ = this.PostSubject$.asObservable();

    //*- Suscripcion y uso de filtros con Pipe :

    this.Suscription = this.PostObservable$.pipe(
      map((ArrayPost) => {
        ArrayPost.map((post: IPost) => {
          return { title: post.title, body: post.body };
        });
      })
    ).subscribe();
  }

  //*- Metodo para subir los datos de la Api a nuestro Subject :

  SubirDatos() {
    this.ServicioUsuario.SendUsers();
  }

  //*- Nos desuscribimos del Observable :

  ngOnDestroy(): void {
    this.Suscription.unsubscribe();
  }

  BotonGetPostPromise() {
    this.ServicioUsuario.getPostPromise()
      .then((response) => {
        this.PostPromise = response.data;
      })
      .catch((err) => console.error(err));
  }
}
