import { Component, OnInit } from '@angular/core';
import { ProcedurService } from '../services/procedur.service';
import { Procedur } from '../view-procedurer/procedur';

@Component({
  selector: 'app-createprocedur',
  templateUrl: './createprocedur.component.html',
  styleUrls: ['./createprocedur.component.css']
})
export class CreateprocedurComponent implements OnInit {

  procedur: Procedur;
  constructor(private procedureService: ProcedurService) { }

  ngOnInit() {
  }

  createProcedur() {
    this.procedur = {ProcedurerId: 0,  region: { RegionId: 1, RegionNamn: 'Vg'},
                     Organomrade: 'Bröst', Procedure: 'FNA egen', IsDoctor: false,
                     Faktureras: 'Punktion egen',   AtenaNameing: '',
                     DateCreated: new Date(), Provmaterial: 'Bröst',
                     regelTypen: {RegelTypeId: 1, RegelTypeName: 'BMA'}, UpdatedByUserId: 'perw'};

    this.procedureService.createProcedure(this.procedur).subscribe();
    console.log('Added');
  }

}
