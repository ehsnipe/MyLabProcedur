import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, Sort} from '@angular/material';

import { RegelService } from '../services/regel.service';
import { Regel } from '../model/regel';
import { CreateregelComponent} from '../createregel/createregel.component';
import { FormControl } from '@angular/forms';
import { RegelType } from '../model/regeltype';

@Component({
  selector: 'app-view-regler',
  templateUrl: './view-regler.component.html',
  styleUrls: ['./view-regler.component.css']
})
export class ViewReglerComponent implements OnInit {
  displayedColumns = ['RegelTypeName', 'Fakt', 'StartAntal', 'SlutAntal'];

  selectedRowIndex = -1;

  dataSource = new MatTableDataSource<Regel>();

  uniqueRegelList = [];
  reglerFC = new FormControl();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private regelService: RegelService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateregelComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllRegels();
    });
  }

  ngOnInit() {
    this.getAllRegels();
    this.regelService.getUniqueRegel().subscribe(r =>
      this.uniqueRegelList = r);
  }

  private getAllRegels() {
    this.regelService.getRegler().subscribe(r => {
      this.dataSource.data = r;
      this.dataSource.filterPredicate = (data: Regel, filter: string) => {
        if (this.reglerFC.value.length < 1) {
          return true;
        }
        return this.reglerFC.value.indexOf(data.RegelTypeName.RegelTypeName) > -1;
      };
    });
  }

  onEdit(regel: Regel): void {
    console.log(regel.RegelId);
    const dialogRef = this.dialog.open(CreateregelComponent, {
      width: '250px',
      data: { regel }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllRegels();
    });
  }
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
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

  applyRegelSelection() {
    this.dataSource.filter = ' ';
  }

  highlight(row) {
    console.log('RowId: ' + row.RegelId);
    this.selectedRowIndex = row.RegelId;
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
