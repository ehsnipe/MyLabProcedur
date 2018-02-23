import { Component, OnInit } from '@angular/core';

import {Procedur} from './procedur';

@Component({
  selector: 'app-view-procedurer',
  templateUrl: './view-procedurer.component.html',
  styleUrls: ['./view-procedurer.component.css']
})
export class ViewProcedurerComponent implements OnInit {

  procedurer: Procedur[] = [{ ProcedurerId: 1, Organomrade: 'Orgomr', Procedure: 'Skrap',
      Provmaterial: 'Patologi', IsDoctor: false, Faktureras: 'BMA antal klossar',
      AtenaNameing: 'Kloss', UpdatedByUserId: 'perw'
      },
      { ProcedurerId: 2, Organomrade: 'Orgomr', Procedure: 'Skrap',
      Provmaterial: 'Patologi', IsDoctor: true, Faktureras: 'BMA antal klossar',
      AtenaNameing: 'Kloss', UpdatedByUserId: 'perw'
      },
      { ProcedurerId: 3, Organomrade: 'Orgomr', Procedure: 'Skrap',
      Provmaterial: 'Patologi', IsDoctor: false, Faktureras: 'BMA antal klossar',
      AtenaNameing: 'Kloss', UpdatedByUserId: 'perw'
    }];

  constructor() { }

  ngOnInit() {
  }

}


