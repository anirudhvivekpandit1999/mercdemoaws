const express = require("express");
const router = express.Router();
const { callStoredProcedure } = require("../services/database.service");

const validateEncryptedRequest = (req, res, next) => {
   if (!req.body || !req.body.encryptedData) {
      return res.status(400).json({
         success: false,
         message: "Request must include encrypted data"
      });
   }
   next();
};



router.post("/getRegulationDetails", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("spd_GetRegulationDetails", req);
      res.json({
         success: true,
         data: result
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



module.exports = router;