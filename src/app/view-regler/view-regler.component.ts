import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, Sort} from '@angular/material';

import { RegelService } from '../services/regel.service';
import { Regel } from './regel';
import { CreateregelComponent} from '../createregel/createregel.component';

@Component({
  selector: 'app-view-regler',
  templateUrl: './view-regler.component.html',
  styleUrls: ['./view-regler.component.css']
})
export class ViewReglerComponent implements OnInit {
  displayedColumns = ['RegelTypeName', 'Fakt', 'StartAntal', 'SlutAntal'];
  regler: Regel[];
  animal: string;
  name: string;
  selectedRowIndex = -1;
  sortedData;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private regelService: RegelService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateregelComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllRegels();
    });
  }

  ngOnInit() {
    this.getAllRegels();
  }

  private getAllRegels() {
    this.regelService.getRegler().subscribe(r => {
      this.regler = r;
      this.sortedData = this.regler.slice();
    });
  }

  sortData(sort: Sort) {
    console.log('Hit');
    const data = this.regler.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'RegelTypeName': return compare(a.RegelTypeName.RegelTypeName + a.StartAntal.toString(36),
                            b.RegelTypeName.RegelTypeName + b.StartAntal.toString(36), isAsc); // Base 36.. Only work up to 36
        case 'Fakt': return compare(a.Fakt, b.Fakt, isAsc);
        case 'StartAntal': return compare(a.RegelTypeName.RegelTypeName + a.StartAntal.toString(36),
                            b.RegelTypeName.RegelTypeName + b.StartAntal.toString(36), isAsc);
        default: return 0;
      }
    });
  }



  highlight(row) {
    console.log('RowId: ' + row.RegelId);
    this.selectedRowIndex = row.RegelId;
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
