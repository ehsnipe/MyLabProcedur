import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FargningService } from '../services/fargning.service';
import { FargRegel } from '../model/fargregel';
import { MatTableDataSource, MatSort, MatSortable, MatSortHeader } from '@angular/material';

@Component({
  selector: 'app-view-fargningregler',
  templateUrl: './view-fargningregler.component.html',
  styleUrls: ['./view-fargningregler.component.css']
})
export class ViewFargningreglerComponent implements OnInit {

  displayedColumns = ['RegelTypeName', 'Fakt', 'StartAntal', 'SlutAntal'];
  constructor(private fargService: FargningService) { }

  selectedRowIndex = -1;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<FargRegel>();

  ngOnInit() {
    this.getAllRegels();
  }

  private getAllRegels() {
    this.fargService.getFargningRegler().subscribe(r => {
      console.log('got all: ' + r.length);
      this.dataSource.data = r;
      this.dataSource.sort = this.sort;
    });
  }

  highlight(row) {
    console.log('RowId: ' + row.FargRegelId);
    this.selectedRowIndex = row.FargRegelId;
  }
  openDialog() {

  }
}
