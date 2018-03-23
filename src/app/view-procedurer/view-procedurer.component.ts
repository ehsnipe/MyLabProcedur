import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import {MatTableDataSource, MatSort} from '@angular/material';

import {Procedurer} from '../model/procedur';
import {ProcedurService} from '../services/procedur.service';

@Component({
  selector: 'app-view-procedurer',
  templateUrl: './view-procedurer.component.html',
  styleUrls: ['./view-procedurer.component.css']
})
export class ViewProcedurerComponent implements OnInit, AfterViewInit {
  displayedColumns = ['Organomrade', 'Provmaterial', 'Procedure', 'IsDoctor', 'Faktureras',
                      'AtenaNameing', 'RegelTypeName', 'RegionNamn'];
  procedurer: Procedurer[];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  selectedRowIndex = -1;

  constructor(private procedureService: ProcedurService) { }

  ngOnInit() {
    this.getProcedurer();
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.procedurer.filter(s => s.Organomrade.SourceGroupDescription.toLowerCase() === filterValue);
  }

  getProcedurer(): void {
    this.procedureService.getProcedurer()
        .subscribe(p => this.dataSource.data = p);
    // this.procedurer = this.procedureService.getProcedurer();
  }

  highlight(row) {
    console.log('RowId: ' + row.ProcedurerId);
    this.selectedRowIndex = row.ProcedurerId;
  }
}
