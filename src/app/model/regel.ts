import { RegelType } from './regeltyp';

export class Regel {
    RegelId: number;
    RegelTypeName: RegelType;
    StartAntal: number;
    SlutAntal: number;
    Fakt: string;
    DateCreated: Date;
    UpdatedByUserId: string;
}
