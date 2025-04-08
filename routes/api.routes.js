const express = require("express");
const router = express.Router();
const { callStoredProcedure } = require("../services/database.service");
const dbConfig = require("../config/db.config");
const { encryptData } = require("../utils/encryption.utils");
const mysql = require("mysql2/promise");


const validateEncryptedRequest = (req, res, next) => {
   if (!req.body || !req.body.encryptedData) {
      return res.status(400).json({
         success: false,
         message: "Request must include encrypted data"
      });
   }
   next();
};
const pool = mysql.createPool(dbConfig);



router.get("/getRegulationDetails", async (req, res, next) => {
   let connection;
   try {
      connection = await pool.getConnection();
      const query = `CALL spd_GetRegulations`;
      const result = await connection.execute(query)
      // const result = await callStoredProcedure("spd_GetRegulationDetails", req);
      res.json({
         success: true,
         data: encryptData(result)
      });
   } catch (error) {
      next(error);
   }
}
);    

router.post("/takeSAPData", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("spd_TakeSAPData", req);
      res.json({
         success: true,
         data: result
      });
   } catch (error) {
      next(error);
   }
}
);   

router.post("/allCalculations", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("SP_AllCalculations", req);
      res.json({
         success: true,
         data: result
      });
   } catch (error) {
      next(error);
   }
}
); 

router.post("/getUnitType", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("spd_getUnitType", req);
      res.json({
         success: true,
         data: result
      });
   } catch (error) {
      next(error);
   }
}
); 



module.exports = router;