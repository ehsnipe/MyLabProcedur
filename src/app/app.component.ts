import { Component } from '@angular/core';
import { LogEvent, LogLevel } from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Unilabs Regelsite';

  constructor(private logger: LogEvent) {}
    debugMe(msg: string): void {
            console.log('click');
            this.logger.log(LogLevel.Debug, msg, 'AppComponent');
          }
}
