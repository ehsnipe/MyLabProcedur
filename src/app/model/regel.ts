import { RegelTypen } from './regeltyp';

export class Regel {
    RegelId: number;
    RegelTypeName: RegelTypen;
    StartAntal: number;
    SlutAntal: number;
    Fakt: string;
    DateCreated: Date;
    UpdatedByUserId: string;
}
