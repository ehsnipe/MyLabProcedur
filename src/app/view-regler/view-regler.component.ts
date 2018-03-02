import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
    this.regelService.getRegler().subscribe(r => this.regler = r);
  }

}
