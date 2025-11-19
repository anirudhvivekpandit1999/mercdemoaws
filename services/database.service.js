const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const { encryptData, decryptData } = require("../utils/encryption.utils");

const pool = mysql.createPool(dbConfig);


async function callStoredProcedure(procedureName, req) {
  let connection;
  try {
    connection = await pool.getConnection();
    
  
          const decryptedBody = decryptData(req.body.encryptedData);

    
    const replacements = Object.values(decryptedBody);
    
    if(req != {}){

    }
    const placeholders = replacements.map(() => "?").join(", ") || {};
    const query = `CALL ${procedureName}(${placeholders || {}})`;
    
    const [rows] = await connection.execute(query || "", replacements || {});
    
    return rows.length > 0 ? encryptData(rows[0]) : { message: "No data found" };
  } catch (error) {
    console.error(`Error executing ${procedureName}:`, error);
    throw new Error(`Database error: ${error.message}`);
  } finally {
    if (connection) connection.release();
  }
}

async function callStoredProcedure1(procedureName){
  let connection;
  try {
    connection = await pool.getConnection();
    const query = `CALL ${procedureName}`;
    const [rows] = await connection.execute(query);
    return rows.length > 0 ? encryptData(rows[0]) : {message : 'No data found'};
  } catch (error) {
    console.error(`Error executing ${procedureName}`,error.message);
  }
  finally{
    if (connection) connection.release();
  }
}



module.exports = {
  pool,
  callStoredProcedure,
  callStoredProcedure1
};