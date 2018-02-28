import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Regel } from '../view-regler/regel';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegelService {

  private regelUrl = 'http://localhost:2311/api/Regel';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getRegler(): Observable<Regel[]> {
    return this.http.get<Regel[]>(this.regelUrl);
  }

  /** Log a message with the MessageService */
  private log(message: string) {
      this.messageService.add('HeroService: ' + message);
  }

}
