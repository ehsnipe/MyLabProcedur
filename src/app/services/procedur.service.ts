import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError,  map, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { MessageService } from '../message.service';
import { Procedurer } from '../model/procedur';
import {ProcedurerFlat} from '../model/procedurer-flat';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ProcedurService {

  private procedurUrl = 'http://localhost:8087/api/Procedurer';  // URL to web api
  private procedurFlatUrl = 'http://localhost:8087/api/ProcedurFlat';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getProcedurer(): Observable<Procedurer[]> {
    return this.http.get<Procedurer[]>(this.procedurUrl);
  }

  getFlatProcedurer(): Observable<ProcedurerFlat[]> {
    return this.http.get<ProcedurerFlat[]>(this.procedurFlatUrl);
  }

  getUniqueOrganArea(): Observable<string[]> {
    // return of(['Hud', 'etc']);
    const resArr = [];
    this.getFlatProcedurer().subscribe(data => {
      data.filter(function(item) {
        const i = resArr.findIndex(x => x === item.SourceGroupDescription);
        if (i <= -1) {
              resArr.push(item.SourceGroupDescription);
        }
        return null;
      });
    });
    return of(resArr);
  }

  createProcedure(procedur: Procedurer) {
    return this.http.post<Procedurer>(this.procedurUrl, procedur, httpOptions).pipe(
      tap((p: Procedurer) => console.log(`added Procedur id=${p.ProcedurerId}`))
    );
  }

  /** Log a message with the MessageService */
  private log(message: string) {
      this.messageService.add('ProcedurService: ' + message);
  }
}
