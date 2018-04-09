import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class GetProcedurFakt {
  Regionid: number;
  RegionText: string;
  OrganArea: string;
  OrganAreaKod: string;
  ProcedurKod: string;
  ProcedurBeskrivning: string;
  KlossTyp: string;
  FaktureringsKod: string;
  AntalAvTyp: number;
}
