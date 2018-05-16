import { RegelType } from './regeltyp';

export class FargRegel {
    FargRegelId: number;
    RegelTypeName: RegelType;
    StartAntal: number;
    SlutAntal: number;
    Fakt: string;
    DateCreated: Date;
    LastUpdate: Date;
    UpdatedByUserId: string;
}
