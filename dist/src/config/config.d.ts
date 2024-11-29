declare const _default: () => {
    jwt: {
        secret: string;
    };
    database: {
        connectionString: string;
    };
    azureMaps: {
        key: string;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
};
export default _default;
