import { Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError,  map, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Regel } from '../model/regel';
import { Observable } from 'rxjs/Observable';
import { RegelTypen } from '../model/regeltyp';
import { of } from 'rxjs/observable/of';

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

  getUniqueRegel(): Observable<string[]> {
    // if (this.resArr.length > 0) {
    //   return of(this.resArr);
    // }
    const resArr = [];
    this.getRegelTypes().subscribe(data => {
      data.filter(function(item) {
        const i = resArr.findIndex(x => x === item.RegelTypeName);
        if (i <= -1) {
              resArr.push(item.RegelTypeName);
        }
        return null;
      });
    });
    return of(resArr);
  }
  getRegelTypes(): Observable<RegelTypen[]> {
    return this.http.get<RegelTypen[]>(this.regelTypUrl);
  }

  createRegel(regel: Regel) {
    return this.http.post<Regel>(this.regelUrl, regel, httpOptions).pipe(
      tap((r: Regel) => console.log(`added Regel id=${r.RegelId}`))
    );
  }

  /** Log a message with the MessageService */
  private log(message: string) {
      this.messageService.add('RegelService: ' + message);
  }

}
