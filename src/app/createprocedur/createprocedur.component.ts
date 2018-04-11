import { Component, OnInit } from '@angular/core';
import { ProcedurService } from '../services/procedur.service';
import { Procedurer } from '../model/procedur';
import { LogEvent, LogLevel } from '../services/log.service';

@Component({
  selector: 'app-createprocedur',
  templateUrl: './createprocedur.component.html',
  styleUrls: ['./createprocedur.component.css']
})
export class CreateprocedurComponent implements OnInit {

  procedur: Procedurer;
  constructor(private procedureService: ProcedurService,
              private logEvent: LogEvent) { }

  ngOnInit() {
  }

  createProcedur() {
    this.procedur = new Procedurer();

    this.procedureService.createProcedure(this.procedur).subscribe();
    this.logEvent.log(LogLevel.Debug, 'Added', 'CreateprocedurComponent');
  }

}
