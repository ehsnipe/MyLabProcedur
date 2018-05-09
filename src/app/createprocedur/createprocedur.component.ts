import { Component, OnInit, Inject, NgModule } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ProcedurService } from '../services/procedur.service';
import { Procedurer, OrganArea, Procedur } from '../model/procedur';
import { LogEvent, LogLevel } from '../services/log.service';
import { Regel } from '../model/regel';
import { RegionService } from '../services/region.service';
import { Region } from '../model/region';
import { ProcedurerFlat } from '../model/procedurer-flat';
import { RegelType } from '../model/regeltyp';

@Component({
  selector: 'app-createprocedur',
  templateUrl: './createprocedur.component.html',
  styleUrls: ['./createprocedur.component.css']
})
export class CreateprocedurComponent implements OnInit {

  procedur: ProcedurerFlat;
  regel: Regel;
  procedurs;
  regler;
  SourceGroupDescription: string;
  SourceGroupCode: string;
  ProcedurBeskrivning: string;
  ProcedurKod: string;
  RegelTypeName: string;
  WhatToCount: string;
  RegionNamn: string;
  buttonText: string;
  showDelete = false;
  selectedProcedur: string;
  selectedRegel: number;
  selectedAntal: string;
  selectedRegion: number;
  selectedOrganOmrade: string;

  organList = [];
  regelList = [];
  antalList = [];
  regionList = [];
  constructor(private procedureService: ProcedurService,
              private regionService: RegionService,
              private logEvent: LogEvent,
              public dialogRef: MatDialogRef<CreateprocedurComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.logEvent.log(LogLevel.Debug, JSON.stringify(data), 'CreateprocedurComponent');
                if (data.procedur) {
                  this.procedur = data.procedur;
                  this.selectedRegel = data.procedur.RegelTypeId;
                  this.selectedAntal = data.procedur.WhatToCount;
                  this.buttonText = 'Updatera procedur';
                  this.showDelete = true;
                  this.selectedOrganOmrade = data.procedur.SourceGroupCode;
                  this.populateProcedurer(data.procedur.SourceGroupCode);
                  this.selectedProcedur = data.procedur.ProcedurKod;
                  this.selectedRegion = data.procedur.RegionId;
                  this.SourceGroupCode = data.procedur.SourceGroupCode;
                  this.ProcedurBeskrivning = data.procedur.ProcedurBeskrivning;
                  this.RegelTypeName = data.procedur.RegelTypeName;
                  this.WhatToCount = data.procedur.WhatToCount;
                } else {
                  this.buttonText = 'Skapa procedur';
                  this.showDelete = false;
                }
              }

  ngOnInit() {
    this.procedureService.getUniqueOrganArea().subscribe(o => {
      this.organList = o;
    });
    this.procedureService.getUniqueRegelName().subscribe(r => {
      this.regelList = r;
    });
    this.procedureService.getUniqueRaknaAntal().subscribe(a => {
      this.antalList = a;
    });
    this.regionService.getUniqueRaknaAntal().subscribe(r => {
      this.regionList = r;
    });
  }

  setOrganArea(): void {
    this.procedureService.getUniqueProcedurs(this.selectedOrganOmrade).subscribe(data => this.procedurs = data);
  }

  populateProcedurer(selectedOrgan: string) {
    this.procedureService.getUniqueProcedurs(selectedOrgan).subscribe(data => this.procedurs = data);
  }

  onOptionsSelected(event) {
    console.log('RegionId: ' + JSON.stringify(event));
  }

  createProcedur() {
    if (this.procedur) {
      this.updateProcedur();
      return;
    }
    const newP = new Procedurer();
    newP.region = new Region();
    newP.region.RegionId = this.selectedRegion;
    newP.Organomrade = new OrganArea();
    newP.Organomrade.SourceGroupCode = this.selectedOrganOmrade;
    newP.Procedur = new Procedur();
    newP.Procedur.Kod = this.selectedProcedur;
    newP.WhatToCount = this.selectedAntal;
    this.procedureService.createProcedure(newP).subscribe(p => {
      this.logEvent.log(LogLevel.Debug, 'Added procedur: ' + p.ProcedurerId, 'CreateprocedurComponent');
      this.dialogRef.close();
    });
  }
  updateProcedur() {
    console.log(JSON.stringify(this.procedur));
    const newP = new Procedurer();
    newP.ProcedurerId = this.procedur.ProcedurerId;
    newP.region = new Region();
    newP.region.RegionId = this.selectedRegion;
    newP.Organomrade = new OrganArea();
    newP.Organomrade.SourceGroupCode = this.selectedOrganOmrade;
    newP.Procedur = new Procedur();
    newP.Procedur.Kod = this.selectedProcedur;
    newP.RegelType = new RegelType();
    newP.RegelType.RegelTypeId = this.selectedRegel;
    newP.WhatToCount = this.selectedAntal;
    console.log(JSON.stringify(newP));
    this.procedureService.updateProcedure(newP).subscribe(p => {
      this.logEvent.log(LogLevel.Debug, 'Update procedur: ' + p.ProcedurerId, 'CreateprocedurComponent');
    });
  }
  cancel() {
    this.dialogRef.close();
  }
}
