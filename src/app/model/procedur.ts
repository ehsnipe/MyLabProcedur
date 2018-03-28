import { Region } from './region';
import { RegelTypen } from './regeltyp';


export class Procedurer {
    ProcedurerId: number;
    region: Region;
    Organomrade: OrganArea;
    Procedure: Procedur;
    IsDoctor: boolean;
    Faktureras: string;
    AtenaNameing: string;
    DateCreated: Date;
    Provmaterial: string;
    regelTypen: RegelTypen;
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
