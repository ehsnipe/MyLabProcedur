import { LogLevel } from '../services/log.service';

export interface IAppConfig {
    env: {
        name: string;
    };
    appInsights: {
        instrumentationKey: string;
    };
    logging: {
        loggingURL: string;
        console: boolean;
        webapi: boolean;
        logLevel: LogLevel;
    };
    aad: {
        requireAuth: boolean;
        tenant: string;
        clientId: string;

    };
    apiServer: {
        ProcedurFakt: string;
        Procedurer: string;
        ProcedurFlat: string;
        ProcedurFlatCashTimeout: number;
        FargningsTypUrl: string
        FargRegelUrl: string;
        RegelUrl: string;
        RegelTypUrl: string;
    };
}
