import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs/Observable';
import { FargningsTyp } from '../model/fargningstyp';
import { FargRegel } from '../model/fargregel';

@Injectable()
export class FargningService {

  private fargningsTypUrl = 'http://localhost:8087/api/FargningsTyp';  // URL to web api
  private fargRegelUrl = 'http://localhost:8087/api/FargRegel';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getFargningTyps(): Observable<FargningsTyp[]> {
      return this.http.get<FargningsTyp[]>(this.fargningsTypUrl);
    }

    getFargningRegler(): Observable<FargRegel[]> {
      return this.http.get<FargRegel[]>(this.fargRegelUrl);
    }
}
