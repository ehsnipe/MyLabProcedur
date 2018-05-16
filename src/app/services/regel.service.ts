import { Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError,  map, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Regel } from '../model/regel';
import { Observable } from 'rxjs/Observable';
import { RegelType } from '../model/regeltyp';
import { of } from 'rxjs/observable/of';
import { AppConfig } from '../app.config';
import { LogEvent, LogLevel } from './log.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class RegelService {

  private regelUrl = AppConfig.settings.apiServer.RegelUrl;  // URL to web api
  private regelTypUrl = AppConfig.settings.apiServer.RegelTypUrl;
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private config: AppConfig,
    private logEvent: LogEvent) { }

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
  getRegelTypes(): Observable<RegelType[]> {
    return this.http.get<RegelType[]>(this.regelTypUrl);
  }

  createRegel(regel: Regel): Observable<Regel> {
    return this.http.post<Regel>(this.regelUrl, regel, httpOptions).pipe(
      tap((r: Regel) => this.logEvent.log(LogLevel.Debug,  `added Regel id=${r.RegelId}`, 'RegelService'))
    );
  }

  updateRegel(regel: Regel) {
    return this.http.put<Regel>(this.regelUrl + '/' + regel.RegelId, regel, httpOptions).pipe(
      tap(() => this.logEvent.log(LogLevel.Debug,  `update Regel id=${regel.RegelId}`, 'RegelService'))
    );
  }

  deleteRegel(regel: Regel) {
    return this.http.delete<Regel>(this.regelUrl + '/' + regel.RegelId, httpOptions).pipe(
      tap(() => this.logEvent.log(LogLevel.Debug,  `update Regel id=${regel.RegelId}`, 'RegelService'))
    );
  }

  /** Log a message with the MessageService */
  private log(message: string) {
      this.messageService.add('RegelService: ' + message);
  }

}
