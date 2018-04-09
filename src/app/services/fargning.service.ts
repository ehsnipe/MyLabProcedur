import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs/Observable';
import { FargningsTyp } from '../model/fargningstyp';
import { FargRegel } from '../model/fargregel';
import { AppConfig } from '../app.config';

@Injectable()
export class FargningService {

  private fargningsTypUrl = AppConfig.settings.apiServer.FargningsTypUrl;  // URL to web api
  private fargRegelUrl = AppConfig.settings.apiServer.FargRegelUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private config: AppConfig) { }

    getFargningTyps(): Observable<FargningsTyp[]> {
      return this.http.get<FargningsTyp[]>(this.fargningsTypUrl);
    }

    getFargningRegler(): Observable<FargRegel[]> {
      return this.http.get<FargRegel[]>(this.fargRegelUrl);
    }
}
