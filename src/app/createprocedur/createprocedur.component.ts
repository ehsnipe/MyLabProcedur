import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ProcedurService } from '../services/procedur.service';
import { Procedurer } from '../model/procedur';
import { LogEvent, LogLevel } from '../services/log.service';
import { Regel } from '../model/regel';
import { RegionService } from '../services/region.service';

@Component({
  selector: 'app-createprocedur',
  templateUrl: './createprocedur.component.html',
  styleUrls: ['./createprocedur.component.css']
})
export class CreateprocedurComponent implements OnInit {

  procedur: Procedurer;
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
  selectedRegel: string;
  selectedAntal: string;
  selectedRegion: string;
  organOmrade: string;

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
                  this.organOmrade = data.procedur.SourceGroupCode;
                  this.populateProcedurer(data.procedur.SourceGroupCode);
                  this.selectedProcedur = data.procedur.ProcedurKod;
                  this.selectedRegion = data.procedur.RegionNamn;
                  this.SourceGroupCode = data.procedur.SourceGroupCode;
                  this.ProcedurBeskrivning = data.procedur.ProcedurBeskrivning;
                  this.RegelTypeName = data.procedur.RegelTypeName;
                  this.WhatToCount = data.procedur.WhatToCount;
                  this.RegionNamn = data.procedur.RegionNamn;
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

  populateProcedurer(selectedOrgan: string) {
    this.procedureService.getUniqueProcedurs(selectedOrgan).subscribe(data => this.procedurs = data);
  }
  createProcedur() {
    this.procedur = new Procedurer();

    this.procedureService.createProcedure(this.procedur).subscribe();
    this.logEvent.log(LogLevel.Debug, 'Added', 'CreateprocedurComponent');
  }
  cancel() {
    this.dialogRef.close();
  }
}
