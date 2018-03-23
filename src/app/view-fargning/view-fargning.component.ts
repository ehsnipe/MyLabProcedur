import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FargningService } from '../services/fargning.service';
import { FargningsTyp } from '../model/fargningstyp';
import { MatSort, MatTableDataSource, MatSortable, MatSortHeader, MAT_SORT_HEADER_INTL_PROVIDER } from '@angular/material';

@Component({
  selector: 'app-view-fargning',
  templateUrl: './view-fargning.component.html',
  styleUrls: ['./view-fargning.component.css']
})
export class ViewFargningComponent implements OnInit, AfterViewInit {

  displayedColumns = ['Fargning', 'Arbetsgrupp', 'FargningsKod',  'AthenaName', 'RegelName', 'RegionNamn'];
  constructor(private fargningService: FargningService) { }

  selectedRowIndex = -1;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<FargningsTyp>();

  ngOnInit() {
    console.log('In ngOnInit');
    this.fargningService.getFargningTyps()
    .subscribe(f => {
      if (!f) {
        return;
      }
      console.log('got data');
      this.dataSource.data = f; // = new MatTableDataSource(f);
      console.log('add sort');
      this.dataSource.sort = this.sort;
      console.log('done');
    });
  }

  ngAfterViewInit(): void {
    console.log('In ngAfterViewInit');
  }

  getFargning(): void {
    this.fargningService.getFargningTyps()
    .subscribe(result => {
      if (!result) {
        return;
      }
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
    });
  }

  highlight(row) {
    console.log('RowId: ' + row.FargningId);
    this.selectedRowIndex = row.FargningId;
  }
}
