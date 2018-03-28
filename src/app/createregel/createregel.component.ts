import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormControl, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

import { RegelService } from '../services/regel.service';
import { Regel } from '../model/regel';
import { RegelType } from '../model/regeltype';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  optionSelected: number;
  optionTextSelected: string;

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

    this.regel = new Regel();
    this.regel.RegelTypeName = {RegelTypeId: this.optionSelected, RegelTypeName: this.optionTextSelected};
    this.regel.UpdatedByUserId = 'perw';
    this.regel.Fakt = this.faktText;
    this.regel.StartAntal = this.startVal;
    this.regel.SlutAntal = this.slutVal;

    this.regelService.createRegel(this.regel).subscribe(() => {
      console.log('Added');
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  onOptionsSelected(event) {
    console.log('Hello');
   // this.optionSelected = event.RegelTypeId;
    // this.optionTextSelected = event.RegelTypeName;
  }

}
