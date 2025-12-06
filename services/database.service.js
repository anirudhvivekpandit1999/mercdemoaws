const sql = require("mssql");
const dbConfig = require("../config/db.config"); // MSSQL config
const { encryptData, decryptData } = require("../utils/encryption.utils");

// Create a connection pool
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

// Call stored procedure with parameters
async function callStoredProcedure(procedureName, req) {
  await poolConnect; // ensures pool is connected
  let request;
  try {
    request = pool.request();

    // Decrypt incoming request body
    const decryptedBody = decryptData(req.body.encryptedData);

    // Add input parameters dynamically
    Object.entries(decryptedBody).forEach(([key, value]) => {
      // Default to NVARCHAR(MAX) for strings, INT for numbers
      if (typeof value === "number") {
        request.input(key, sql.Float, value);
      } else if (typeof value === "boolean") {
        request.input(key, sql.Bit, value);
      } else if (value instanceof Date) {
        request.input(key, sql.Date, value);
      } else {
        request.input(key, sql.NVarChar(sql.MAX), value);
      }
    });

    // Execute the stored procedure
    const result = await request.execute(procedureName);

    // result.recordset contains the rows
    return result.recordset.length > 0
      ? encryptData(result.recordset)
      : { message: "No data found" };
  } catch (error) {
    console.error(`Error executing ${procedureName}:`, error);
    throw new Error(`Database error: ${error.message}`);
  }
}

// Call stored procedure without parameters
async function callStoredProcedure1(procedureName) {
  await poolConnect;
  try {
    const request = pool.request();
    const result = await request.execute(procedureName);

    return result.recordset.length > 0
      ? encryptData(result.recordset)
      : { message: "No data found" };
  } catch (error) {
    console.error(`Error executing ${procedureName}:`, error.message);
    throw new Error(`Database error: ${error.message}`);
  }
}

module.exports = {
  pool,
  callStoredProcedure,
  callStoredProcedure1,
};
