import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import {MatTableDataSource, MatSort, MatDialog} from '@angular/material';

import {Procedurer, Procedur, OrganArea} from '../model/procedur';
import {ProcedurerFlat} from '../model/procedurer-flat';
import {ProcedurService} from '../services/procedur.service';
import { FormControl } from '@angular/forms';
import { LogEvent, LogLevel } from '../services/log.service';
import { CreateprocedurComponent } from '../createprocedur/createprocedur.component';

@Component({
  selector: 'app-view-procedurer',
  templateUrl: './view-procedurer.component.html',
  styleUrls: ['./view-procedurer.component.css']
})
export class ViewProcedurerComponent implements OnInit, AfterViewInit {
  displayedColumns = ['SourceGroupDescription', 'SourceGroupCode', 'Procedure', 'ProcedurKod',
                     'RegelTypeName', 'WhatToCount', 'RegionNamn'];

  dataSource = new MatTableDataSource<ProcedurerFlat>();
  @ViewChild(MatSort) sort: MatSort;

  selectedRowIndex = -1;
  organSelection = '';
  organs = new FormControl();
  myFilterValue = '';
  isFilterUsed = false;

  organList = [];

  constructor(private procedureService: ProcedurService,
              private logEvent: LogEvent,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getProcedurer();
    this.procedureService.getUniqueOrganArea().subscribe(o =>
        this.organList = o);

    this.dataSource.filterPredicate = (data: ProcedurerFlat, filter: string) => {
      // Transform the data into a lowercase string of all property values.
      const accumulator = (currentTerm, key) => currentTerm + data[key];
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = this.myFilterValue.trim().toLowerCase();
        if (!this.organs.value || this.organs.value.length < 1) {
          return dataStr.indexOf(transformedFilter) !== -1;
        }
        const filterCheck = dataStr.indexOf(transformedFilter) !== -1 || transformedFilter === '';
        return this.organs.value.indexOf(data.SourceGroupDescription) > -1 && filterCheck;
      };
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateprocedurComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.logEvent.log(LogLevel.Debug, 'ViewProcedurerComponent', 'The dialog was closed');
      this.getProcedurer();
    });
  }

  onEdit(procedur: ProcedurerFlat): void {
    let id = 0;
    if (procedur) {
      id = procedur.ProcedurerId;
    }
    this.logEvent.log(LogLevel.Debug, 'ViewProcedurerComponent', 'Selected procedure: ' + id);
    const dialogRef = this.dialog.open(CreateprocedurComponent, {
      width: '250px',
      data: { procedur }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProcedurer();
    });
  }

  getProcedurer(): void {
    this.procedureService.getFlatProcedurer()
        .subscribe(p => {
            this.logEvent.log(LogLevel.Debug, 'ViewProcedurerComponent', 'GetTheData');
            this.dataSource.data = p; //  = new MatTableDataSource(p);
            this.dataSource.sort = this.sort;
            this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
              return data[sortHeaderId].toLocaleLowerCase();
            };
          });

    // this.procedurer = this.procedureService.getProcedurer();
  }

  applyOrganSelection() {
      console.log(this.organs.value);
      console.log(this.myFilterValue);
      this.isFilterUsed = true;
      this.dataSource.filter = ' ';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.isFilterUsed = true;
    this.dataSource.filter = filterValue;
  }

  highlight(row) {
    console.log('RowId: ' + row.ProcedurerId);
    this.selectedRowIndex = row.ProcedurerId;
  }
}
