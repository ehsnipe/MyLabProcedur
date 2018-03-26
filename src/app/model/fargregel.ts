import { RegelTypen } from './regeltyp';

export class FargRegel {
    FargRegelId: number;
    RegelTypeName: RegelTypen;
    StartAntal: number;
    SlutAntal: number;
    Fakt: string;
    DateCreated: Date;
    LastUpdate: Date;
    UpdatedByUserId: string;
}
