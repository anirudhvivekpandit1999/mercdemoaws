const express = require("express");
const router = express.Router();
const { callStoredProcedure ,callStoredProcedure1} = require("../services/database.service");

const validateEncryptedRequest = (req, res, next) => {
   
   next();
};



router.post("/getRegulationDetails", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("spd_getregulationdetails", req);
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
      const result = await callStoredProcedure("sp_takesapdata", req);
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

router.post("/login", validateEncryptedRequest, async (req, res, next) => {
   try {
      const result = await callStoredProcedure("sp_login", req);
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
      const result = await callStoredProcedure("sp_signup", req);
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
      const result = await callStoredProcedure1("spd_getunittype");
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
      const result = await callStoredProcedure("spd_ecrmodel", req);
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
      const result = await callStoredProcedure1("spd_getunittag");
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
      const result = await callStoredProcedure1("spd_getunits",{});
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