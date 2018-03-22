import { Injectable } from '@angular/core';

export abstract class GenericLogger {
  abstract log(msg: string);
}

@Injectable()
export class LogService extends GenericLogger {

  constructor() {
    super();
   }

  log(msg: string): void {
    console.log('Service: ' + msg);
  }

}

export class LogToConsole extends GenericLogger {
  constructor() {
    super();
   }

  log(msg: string): void {
    console.log('Console: ' + msg);
  }
}

@Injectable()
export class LogEvent {
  private level: LogLevel = LogLevel.Debug;
  private loggers: GenericLogger[] = [new LogService(), new LogToConsole()];
  constructor(private logger: LogService) {}

  logIt(logLevel: LogLevel, msg: string, parms: any[]): void {
    if (this.level === LogLevel.Off) {
      return;
    }
    if (this.level >= logLevel) {
      const logMsg = new Date() + ', LogLevel: ' + LogLevel[logLevel] + ', '  + msg;
      this.loggers.forEach(l => {
        l.log(logMsg);
      });
    }
  }
}

export enum LogLevel {
  Debug = 0,
  Warning = 1,
  Error = 2,
  Off = 3
}
