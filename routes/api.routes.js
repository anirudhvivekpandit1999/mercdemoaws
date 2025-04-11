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
      const result = await callStoredProcedure("SP_AllCalculations2", req);
      res.json({
         success: true,
         data: result
      });
   } catch (error) {
      next(error);
   }
}
); 

router.post("/login", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("spd_Login", req);
      res.json({
         success: true,
         data: result
      });
   } catch (error) {
      next(error);
   }
}
); 

router.post("/signUp", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("spd_SignUp", req);
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

router.post("/getECR", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("spd_ECRModel", req);
      res.json({
         success: true,
         data: result
      });
   } catch (error) {
      next(error);
   }
}
); 

router.post("/getUnitTags", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("spd_GetUnitTag", req);
      res.json({
         success: true,
         data: result
      });
   } catch (error) {
      next(error);
   }
}
); 

router.post("/getUnits", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("spd_GetUnits", req);
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