import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from '../message.service';
import { Procedur } from '../view-procedurer/procedur';

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

  /** Log a message with the MessageService */
  private log(message: string) {
      this.messageService.add('HeroService: ' + message);
  }
}
