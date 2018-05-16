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
import { LogEvent, LogLevel } from './log.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class ProcedurService {

  private procedurUrl = AppConfig.settings.apiServer.Procedurer;  // URL to web api
  private procedurFlatUrl = AppConfig.settings.apiServer.ProcedurFlat;
  private cashTimeOut = AppConfig.settings.apiServer.ProcedurFlatCashTimeout;
  private cachedProcFlat: ProcedurerFlat[];
  private cachStartTime: Date;
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private config: AppConfig,
    private logMsg: LogEvent) { }

  getProcedurer(): Observable<Procedurer[]> {
    return this.http.get<Procedurer[]>(this.procedurUrl, {withCredentials: true});
  }

  getFlatProcedurer(): Observable<ProcedurerFlat[]> {
    if (this.cachedProcFlat && !this.isCacheExpiered()) {
      this.logMsg.log(LogLevel.Debug, 'Use cached version', 'ProcedurService');
      return of(this.cachedProcFlat);
    }

    return this.http.get<ProcedurerFlat[]>(this.procedurFlatUrl, {withCredentials: true}).pipe(
      tap((p: ProcedurerFlat[]) => {
        this.cachedProcFlat = p;
        this.initCache();
      })
    );
  }

  initCache(): void {
    this.cachStartTime = new Date();
  }

  isCacheExpiered(): boolean {
    const cachAgeInsec = (new Date().getTime() - this.cachStartTime.getTime()) / 1000;
    this.logMsg.log(LogLevel.Debug, 'isCacheExpiered() ' + cachAgeInsec, 'ProcedurService');
    if (cachAgeInsec > this.cashTimeOut) {
      return true;
    }
    return false;
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
    return of(resArr.sort((a, b) => a.viewValue < b.viewValue ? -1 : a.viewValue > b.viewValue ? 1 : 0));
  }

  getUniqueRegelName(): Observable<string[]> {
    const resArr = [];
    this.getFlatProcedurer().subscribe(data => {
      data.filter(function(item) {
        const i = resArr.findIndex(x => x.viewValue === item.RegelTypeName);
        if (i <= -1) {
              resArr.push({viewValue: item.RegelTypeName, value: item.RegelTypeId});
        }
        return null;
      });
    });
    return of(resArr.sort((a, b) => a.viewValue < b.viewValue ? -1 : a.viewValue > b.viewValue ? 1 : 0));
  }

  getUniqueRaknaAntal(): Observable<object[]> {
    const resArr = [{viewValue: '', value: ''}, {viewValue: 'KLOSS', value: 'KLOSS'}, {viewValue: 'GLAS', value: 'GLAS'} ];

    return of(resArr);
  }
  getUniqueProcedurs(selectedOrgan: string): Observable<string[]> {
    // return of([{'Biopsi', 'PX'}, {'Exostos', 'EXOS'}]);
    const resArr = [];
    this.logMsg.log(LogLevel.Debug, 'Selected: ' + selectedOrgan, 'ProcedurService');
    this.getFlatProcedurer().subscribe(data => {
      data.filter(function(item) {
        const i = resArr.findIndex(x => x.viewValue === item.ProcedurBeskrivning);
        if (i <= -1 && item.SourceGroupCode === selectedOrgan) {
              resArr.push({viewValue: item.ProcedurBeskrivning, value: item.ProcedurKod});
        }
        return null;
      });
    });
    return of(resArr.sort((a, b) => a.viewValue < b.viewValue ? -1 : a.viewValue > b.viewValue ? 1 : 0));
  }
  createProcedure(procedur: Procedurer) {
    return this.http.post<Procedurer>(this.procedurUrl, procedur, httpOptions).pipe(
      tap((p: Procedurer) => this.logMsg.log(LogLevel.Debug, `added Procedur id=${p.ProcedurerId}`, 'ProcedurService'))
    );
  }

  updateProcedure(procedur: Procedurer) {
    console.log(JSON.stringify(procedur));
    return this.http.put<Procedurer>(this.procedurUrl + '/' + procedur.ProcedurerId, procedur, httpOptions).pipe(
      tap((p: Procedurer) => this.logMsg.log(LogLevel.Debug, `update Procedur id=${p.ProcedurerId}`, 'ProcedurService'))
    );
  }

  deleteProcedure(procedurId: number) {
    return this.http.delete(this.procedurUrl + '/Delete?procedurerId=' + procedurId, httpOptions).pipe(
      tap((p: Procedurer) => this.logMsg.log(LogLevel.Debug, `delete Procedur id=${procedurId}`, 'ProcedurService'))
    );
  }

  getFakt(getProc: GetProcedurFakt): Observable<string> {
    const url = AppConfig.settings.apiServer.ProcedurFakt;
    this.logMsg.log(LogLevel.Debug, 'In getFact()', 'ProcedurService');
    return this.http.post<string>(url, getProc, httpOptions);
  }
  /** Log a message with the MessageService */
  private log(message: string) {
      this.messageService.add('ProcedurService: ' + message);
  }
}
