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

   class Region {
    RegionId: number;
    RegionNamn: string;
  }
  class RegelTypen {
    RegelTypeId: number;
    RegelTypeName: string;
  }
class OrganArea {
  SourceGroupCode: string;
  SourceGroupDescription: string;
  DateCreated: Date;
  LastUpdated: Date;
  UpdatedByUserId: string;
}
class Procedur {
  Kod: string;
  Beskrivning: string;
  Giltig: boolean;
  GiltigFrom: Date;
  GiltigTo: Date;
  DateCreated: Date;
  LastUpdate: Date;
  UpdatedByUserId: string;
}
