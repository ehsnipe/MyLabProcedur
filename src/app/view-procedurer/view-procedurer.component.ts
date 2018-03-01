import { Component, OnInit } from '@angular/core';

import {MatTableDataSource} from '@angular/material';

import {Procedur} from './procedur';
import {ProcedurService} from '../services/procedur.service';

@Component({
  selector: 'app-view-procedurer',
  templateUrl: './view-procedurer.component.html',
  styleUrls: ['./view-procedurer.component.css']
})
export class ViewProcedurerComponent implements OnInit {
  displayedColumns = ['Organomrade', 'Provmaterial', 'Procedure', 'IsDoctor', 'Faktureras',
                      'AtenaNameing', 'RegelTypeName', 'RegionNamn'];
  procedurer: Procedur[];

  constructor(private procedureService: ProcedurService) { }

  ngOnInit() {
    this.getProcedurer();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.procedurer.filter(s => s.Organomrade.toLowerCase() === filterValue);
  }

  getProcedurer(): void {
    this.procedureService.getProcedurer()
        .subscribe(p => this.procedurer = p);
    // this.procedurer = this.procedureService.getProcedurer();
  }

}
