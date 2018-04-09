import { Component, OnInit, ViewChild,
         AfterViewInit, ElementRef } from '@angular/core';
import { ProcedurService } from '../services/procedur.service';
import { GetProcedurFakt } from '../model/getprocedurfakt';


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
    {value: 1, viewValue: 'Västragötaland'},
    {value: 2, viewValue: 'Stockholm'},
    {value: 3, viewValue: 'Värmland'},
    {value: 4, viewValue: 'Sunderbyn'}
  ];

  faktureringCodes = [
    {value: '1', viewValue: 'Ett'},
    {value: '2', viewValue: 'Två'},
    {value: '3', viewValue: 'Tre'},
  ];
  constructor(private procedurService: ProcedurService) { }

  ngOnInit() {
    this.procedurService.getUniqueOrganArea().subscribe(data => this.organs = data);

    this.procedurService.getUniqueProcedurs().subscribe(data => this.procedurs = data);
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
    console.log('Before call service');
    this.procedurService.getFakt(test).subscribe(faktResult => {
      this.cnt++;
      console.log('inside');
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

