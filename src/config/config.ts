export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    connectionString: process.env.MONGO_URL,
  },
  azureMaps: {
    key: process.env.AZURE_MAPS_KEY,  // Azure Maps API Key from environment variable
  },
});
