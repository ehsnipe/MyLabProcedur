import { Region } from './region';

export class FargningsTyp {
    Arbetsgrupp: WorkGroup;
    AthenaName: string;
    DateCreated: Date;
    Faktureras: string;
    Fargning: string;
    FargningId: number;
    FargningsKod: string;
    FargningsTypId: number;
    LastUpdate: Date;
    RegelName: RegelName;
    Region: Region;
    UpdatedByUserId: string;
}

class WorkGroup {
    Arbetsgrupp: string;
    ArbetsgruppId: number;
    DateCreated: Date;
    Kod: string;
    LastUpdate: Date;
    UpdatedByUserId: string;
}

class RegelName {
    RegelTypeId: number;
    RegelTypeName: string;
}
