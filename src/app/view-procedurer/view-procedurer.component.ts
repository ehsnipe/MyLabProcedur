import { Component, OnInit } from '@angular/core';

import {Procedur} from './procedur';
import {ProcedurService} from '../services/procedur.service';

@Component({
  selector: 'app-view-procedurer',
  templateUrl: './view-procedurer.component.html',
  styleUrls: ['./view-procedurer.component.css']
})
export class ViewProcedurerComponent implements OnInit {

  procedurer: Procedur[];

  constructor(private procedureService: ProcedurService) { }

  ngOnInit() {
    this.getProcedurer();
  }

  getProcedurer(): void {
    this.procedureService.getProcedurer()
        .subscribe(p => this.procedurer = p);
    // this.procedurer = this.procedureService.getProcedurer();
  }

}


