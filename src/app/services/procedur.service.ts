import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError,  map, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { MessageService } from '../message.service';
import { Procedurer } from '../model/procedur';
import {ProcedurerFlat} from '../model/procedurer-flat';
import { GetProcedurFakt } from '../model/getprocedurfakt';
import { AppConfig } from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class ProcedurService {

  private procedurUrl = AppConfig.settings.apiServer.Procedurer;  // URL to web api
  private procedurFlatUrl = AppConfig.settings.apiServer.ProcedurFlat;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private config: AppConfig) { }

  getProcedurer(): Observable<Procedurer[]> {
    return this.http.get<Procedurer[]>(this.procedurUrl);
  }

  getFlatProcedurer(): Observable<ProcedurerFlat[]> {
    return this.http.get<ProcedurerFlat[]>(this.procedurFlatUrl);
  }

  getUniqueOrganArea(): Observable<string[]> {
    // return of([{'Hud', 'HUD'}, {'Gynekologi', 'GYN'}]);
    const resArr = [];
    this.getFlatProcedurer().subscribe(data => {
      data.filter(function(item) {
        const i = resArr.findIndex(x => x.viewValue === item.SourceGroupDescription);
        if (i <= -1) {
              resArr.push({viewValue: item.SourceGroupDescription, value: item.SourceGroupCode});
        }
        return null;
      });
    });
    return of(resArr);
  }

  getUniqueProcedurs(): Observable<string[]> {
    // return of([{'Biopsi', 'PX'}, {'Exostos', 'EXOS'}]);
    const resArr = [];
    this.getFlatProcedurer().subscribe(data => {
      data.filter(function(item) {
        const i = resArr.findIndex(x => x.viewValue === item.ProcedurBeskrivning);
        if (i <= -1) {
              resArr.push({viewValue: item.ProcedurBeskrivning, value: item.ProcedurKod});
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

  getFakt(getProc: GetProcedurFakt): Observable<string> {
    const url = AppConfig.settings.apiServer.ProcedurFakt;
    console.log('In service');
    return this.http.post<string>(url, getProc);
  }
  /** Log a message with the MessageService */
  private log(message: string) {
      this.messageService.add('ProcedurService: ' + message);
  }
}
