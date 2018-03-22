import { Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError,  map, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Regel } from '../view-regler/regel';
import { Observable } from 'rxjs/Observable';
import { RegelType } from '../view-regler/regeltype';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class RegelService {

  private regelUrl = 'http://localhost:8087/api/Regel';  // URL to web api
  private regelTypUrl = 'http://localhost:8087/api/RegelType';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getRegler(): Observable<Regel[]> {
    return this.http.get<Regel[]>(this.regelUrl);
  }

  getRegelTypes(): Observable<RegelType[]> {
    return this.http.get<RegelType[]>(this.regelTypUrl);
  }

  createRegel(regel: Regel) {
    return this.http.post<Regel>(this.regelUrl, regel, httpOptions).pipe(
      tap((r: Regel) => console.log(`added Regel id=${r.RegelId}`))
    );
  }

  /** Log a message with the MessageService */
  private log(message: string) {
      this.messageService.add('HeroService: ' + message);
  }

}
