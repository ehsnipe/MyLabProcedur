import { Component, OnInit, ViewChild,
         AfterViewInit, ElementRef } from '@angular/core';
import { ProcedurService } from '../services/procedur.service';
import { GetProcedurFakt } from '../model/getprocedurfakt';
import { LogEvent, LogLevel } from '../services/log.service';


@Component({
  selector: 'app-regel-tester',
  templateUrl: './regel-tester.component.html',
  styleUrls: ['./regel-tester.component.css']
})
export class RegelTesterComponent implements OnInit  {

  oraganArea;
  provMaterial;
  procedurs;
  regelTypes;
  organs;
  result = '';
  log = '';
  cnt = 0;
  selectedRegion;
  selectedOrgan = '';
  selectedProcedur = '';
  selectedWhatToCount = '';
  selectedFakturerinsKod = '';
  antal;
  isSunderbyn = false;

  @ViewChild('resultDiv') resultDiv: ElementRef;

  countAntal = [
    {value: '', viewValue: 'Inget'},
    {value: 'GLAS', viewValue: 'GLAS'},
    {value: 'KLOSS', viewValue: 'KLOSS'},
    {value: 'ALASCCA', viewValue: 'ALASCCA'},
    {value: 'FRYS kloss', viewValue: 'FRYS kloss'},
    {value: 'Storsnitt kloss', viewValue: 'Storsnitt kloss'},
  ];

  regions = [
    {value: 1, viewValue: 'Stockholm'},
    {value: 2, viewValue: 'Skövde'},
    {value: 3, viewValue: 'Eskilstuna'},
    {value: 4, viewValue: 'Sunderbyn'}
  ];

  faktureringCodes = [
    {value: '1', viewValue: 'Ett'},
    {value: '2', viewValue: 'Två'},
    {value: '3', viewValue: 'Tre'},
  ];
  constructor(private procedurService: ProcedurService,
              private logEvent: LogEvent) { }

  ngOnInit() {
    this.procedurService.getUniqueOrganArea().subscribe(data => this.organs = data);
  }
  setOrganArea(): void {
    this.procedurService.getUniqueProcedurs(this.selectedOrgan).subscribe(data => this.procedurs = data);
  }
  testRegel() {
    const test = new GetProcedurFakt();
    if (this.isSunderbyn) {
        test.FaktureringsKod = this.selectedFakturerinsKod;
    }
    test.KlossTyp = this.selectedWhatToCount;
    test.OrganAreaKod = this.selectedOrgan;
    test.ProcedurKod = this.selectedProcedur;
    test.Regionid = this.selectedRegion;
    test.AntalAvTyp = this.antal;
    this.logEvent.log(LogLevel.Debug, JSON.stringify(test), 'RegelTesterComponent');
    this.procedurService.getFakt(test).subscribe(faktResult => {
      this.cnt++;
      this.log = this.selectedOrgan + ', Proc: ' + this.selectedProcedur + ' ' +
                  ', CountWhat: ' + this.selectedWhatToCount + ' Antal: ' + this.antal +
                  ' ==> ' + faktResult + '\n' + this.log;
    }
    );
  }

  clearText() {
    this.log = '';
  }

  setRegion(): void {
    console.log(this.selectedRegion);
    if (this.selectedRegion === 4) {
      this.isSunderbyn = true;
    } else {
      this.isSunderbyn = false;
    }
  }
}

