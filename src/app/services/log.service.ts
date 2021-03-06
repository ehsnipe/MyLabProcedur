import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class LogService {

  constructor(private http: HttpClient,
              private config: AppConfig) {
   }

  log(msg: string): void {
    const url = AppConfig.settings.logging.loggingURL;
    const logMsg = new LogMessage();
    logMsg.Message = msg;
    this.http.post(url, logMsg, httpOptions).subscribe(
      () => null,
      error => console.log('Could not log to web api: ' + msg)
    );
  }

}

@Injectable()
export class LogToConsole {
  constructor() {

   }

  log(msg: string): void {
    console.log(msg);
  }
}

@Injectable()
export class LogEvent {
  private level: LogLevel = <LogLevel>LogLevel[AppConfig.settings.logging.logLevel.toString()]; // Set LogLevel from config.<env>.json
  private includeVersionNr = true;
  private versionNr = 'Version 1.0.1001, ';
  constructor(private webLogger: LogService,
              private consolLogger: LogToConsole,
              private config: AppConfig) {}

  log(logLevel: LogLevel, msg: string, calledFrom: string): void {
    if (AppConfig.settings.logging.logLevel === LogLevel.Off) {
      return;
    }
    if (this.level >= logLevel) {
      if (this.includeVersionNr) {
        this.includeVersionNr = false;
      } else {
        this.versionNr = '';
      }
      const logMsg = this.versionNr + 'From: ' + calledFrom + ', LogLevel: ' + LogLevel[logLevel] + ', '  + msg;
      if (AppConfig.settings.logging.console) {
        this.consolLogger.log(logMsg);
      }
      if (AppConfig.settings.logging.webapi) {
        this.webLogger.log(logMsg);
      }
    }
  }
}

export class LogMessage {
  Message: string;
}
export enum LogLevel {
  Debug = 0,
  Warning = 1,
  Error = 2,
  Off = 3
}
