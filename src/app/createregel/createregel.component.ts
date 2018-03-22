import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormControl, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

import { RegelService } from '../services/regel.service';
import { Regel } from '../view-regler/regel';
import { RegelType } from '../view-regler/regeltype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createregel',
  templateUrl: './createregel.component.html',
  styleUrls: ['./createregel.component.css']
})
export class CreateregelComponent implements OnInit {

  regel: Regel;
  regelTypes: RegelType[];
  startVal: number;
  slutVal: number;
  faktText: string;
  optionSelected: any;

  constructor(private router: Router, private regelService: RegelService,
    public dialogRef: MatDialogRef<CreateregelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getRegelTypes();
  }

  getRegelTypes() {
    this.regelService.getRegelTypes().subscribe(data => this.regelTypes = data);
  }

  createRegel() {

    this.regel = {RegelId: 0,  RegelTypeName: {regelTypeId: this.optionSelected, regelTypeName: 'NA'},
                  StartAntal: this.startVal, SlutAntal: this.slutVal, Fakt: this.faktText,
                  DateCreated: new Date, UpdatedByUserId: 'prew'};

    this.regelService.createRegel(this.regel).subscribe(() => {
      console.log('Added');
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  onOptionsSelected(event) {
    this.optionSelected = event;
  }

}
