import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regel-tester',
  templateUrl: './regel-tester.component.html',
  styleUrls: ['./regel-tester.component.css']
})
export class RegelTesterComponent implements OnInit {

  oraganArea;
  provMaterial;
  procedur;
  isDoctor;
  faktureras;
  atenaName;
  regelTypes;
  antal;
  constructor() { }

  ngOnInit() {
  }

  testRegel() {

  }

  cancel() {

  }
}
