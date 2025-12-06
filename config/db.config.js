const config = {
  server: process.env.DB_HOST,      // required
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 1433, // ensure number type
  options: {
    encrypt: false, // or true if using Azure
    trustServerCertificate: true // recommended for local/dev
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

module.exports = config;
