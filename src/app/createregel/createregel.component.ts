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
import { combineAll } from 'rxjs/operators';

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
  buttonText: string;

  constructor(private router: Router, private regelService: RegelService,
    public dialogRef: MatDialogRef<CreateregelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      if (data.regel) {
        this.regel = data.regel;
        this.buttonText = 'Updatera regel';
        this.faktText = data.regel.Fakt;
        this.slutVal = data.regel.SlutAntal;
        this.startVal = data.regel.StartAntal;
        this.optionSelected = data.regel.RegelTypeName.RegelTypeId;
      } else {
        this.buttonText = 'Skapa regel';
      }
    }

  ngOnInit() {
    this.getRegelTypes();
  }

  getRegelTypes() {
    this.regelService.getRegelTypes().subscribe(data => this.regelTypes = data);
  }

  createRegel() {
    if (this.regel) {
      this.updateRegel();
    } else {
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
  }

  updateRegel(): void {
    this.regel.RegelTypeName = {RegelTypeId: this.optionSelected, RegelTypeName: this.optionTextSelected};
    this.regel.UpdatedByUserId = 'perw';
    this.regel.Fakt = this.faktText;
    this.regel.StartAntal = this.startVal;
    this.regel.SlutAntal = this.slutVal;

    this.regelService.updateRegel(this.regel).subscribe(() => {
      console.log('Updated');
      this.dialogRef.close();
    });
  }
  deleteRegel(): void {
    if (confirm('Vill du ta bort denna regel?')) {
      this.regelService.deleteRegel(this.regel).subscribe(() => {
        console.log('Delete');
        this.dialogRef.close();
      });
    }
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
