import { Component, OnInit } from '@angular/core';
import { ProcedurService } from '../services/procedur.service';
import { Procedurer } from '../model/procedur';

@Component({
  selector: 'app-createprocedur',
  templateUrl: './createprocedur.component.html',
  styleUrls: ['./createprocedur.component.css']
})
export class CreateprocedurComponent implements OnInit {

  procedur: Procedurer;
  constructor(private procedureService: ProcedurService) { }

  ngOnInit() {
  }

  createProcedur() {
    this.procedur = new Procedurer();

    this.procedureService.createProcedure(this.procedur).subscribe();
    console.log('Added');
  }

}
