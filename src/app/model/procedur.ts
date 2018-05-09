import { Region } from './region';
import { RegelType } from './regeltyp';


export class Procedurer {
    ProcedurerId: number;
    region: Region;
    Organomrade: OrganArea;
    Procedur: Procedur;
    IsDoctor: boolean;
    WhatToCount: string;
    AtenaNameing: string;
    DateCreated: Date;
    Provmaterial: string;
    RegelType: RegelType;
    UpdatedByUserId: string;
   }

export class OrganArea {
  SourceGroupCode: string;
  SourceGroupDescription: string;
  DateCreated: Date;
  LastUpdated: Date;
  UpdatedByUserId: string;
}

export class Procedur {
  Kod: string;
  Beskrivning: string;
  Giltig: boolean;
  GiltigFrom: Date;
  GiltigTo: Date;
  DateCreated: Date;
  LastUpdate: Date;
  UpdatedByUserId: string;
}
