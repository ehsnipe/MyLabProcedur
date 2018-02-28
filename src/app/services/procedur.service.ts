import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError,  map, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { MessageService } from '../message.service';
import { Procedur } from '../view-procedurer/procedur';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ProcedurService {

  private procedurUrl = 'http://localhost:2311/api/Procedurer';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getProcedurer(): Observable<Procedur[]> {
    this.messageService.add('ProcedurService: fetched procedurer');
    return this.http.get<Procedur[]>(this.procedurUrl);
  }

  createProcedure(procedur: Procedur) {
    return this.http.post<Procedur>(this.procedurUrl, procedur, httpOptions).pipe(
      tap((p: Procedur) => console.log(`added Procedur id=${p.ProcedurerId}`))
    );
  }

  /** Log a message with the MessageService */
  private log(message: string) {
      this.messageService.add('HeroService: ' + message);
  }
}
