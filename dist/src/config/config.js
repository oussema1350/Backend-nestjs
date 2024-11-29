"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    database: {
        connectionString: process.env.MONGO_URL,
    },
    azureMaps: {
        key: process.env.AZURE_MAPS_KEY,
    },
    throttle: {
        ttl: 60,
        limit: 10,
    },
});
//# sourceMappingURL=config.js.map