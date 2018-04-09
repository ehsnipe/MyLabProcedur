export interface IAppConfig {
    env: {
        name: string;
    };
    appInsights: {
        instrumentationKey: string;
    };
    logging: {
        console: boolean;
        appInsights: boolean;
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
        FargningsTypUrl: string
        FargRegelUrl: string;
        RegelUrl: string;
        RegelTypUrl: string;
    };
}
