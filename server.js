require("dotenv").config();

const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api.routes");
const { encryptData, decryptData } = require("./utils/encryption.utils");
const { decrypt } = require("dotenv");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: process.env.NODE_ENV === "production" ? null : err.message
  });
});

console.log(encryptData({
  "p_unitid":1,
  "p_unittype":"Thermal",
  "p_unitname":"Unit Alpha",
  "p_hdslds":"HDS-LDS-001",
  "p_generationmus":520.5,
  "p_auxiliaryconsumptionmus":8.2,
  "p_normativeapcmus":5.0,
  "p_installedcapacity":500.0,
  "p_avf":85.0,
  "p_stationheatrate":2450.0,
  "p_apc":10.0,
  "p_sfoc":2.10,
  "p_transitloss":0.05,
  "p_stackloss":0.02,
  "p_fixedcost":120.5,
  "p_fixedcostexclwatercharges":115.0,
  "p_roeapplicableforincentive":1.0,
  "p_maxallowabledifferenceinloadingendandunloadingendgcvrawcoal":50.0,
  "p_maxallowabledifferenceinloadingendandunloadingendgcvwashedcoal":40.0,
  "p_gcvrawcoalasbilled":4500.0,
  "p_gcvwashedcoalasbilled":4700.0,
  "p_gcvimportedcoalasbilled":5200.0,
  "p_gcvrawcoalasrecieved":4480.0,
  "p_gcvwashedcoalasrecieved":4680.0,
  "p_gcvimportedcoalasrecieved":5180.0,
  "p_gcvldo":7000.0,
  "p_gcvfo":8000.0,
  "p_gcvcombinedcoalgcvafterstackinglossasfiredbunkeredgcv":4800.0,
  "p_flcrawcoal":0.5,
  "p_flcwashedcoal":0.2,
  "p_flcimportedcoal":0.1,
  "p_flcldo":0.03,
  "p_flcfo":0.02,
  "p_fcrawcoal":10000.0,
  "p_fcwashedcoal":2000.0,
  "p_fcimportedcoal":3000.0,
  "p_fcldo":500.0,
  "p_fcfo":250.0,
  "p_fccrawcoal":10000.0,
  "p_fccwashedcoal":2000.0,
  "p_fccimportedcoal":3000.0,
  "p_fccothervariablecosts":100.0,
  "p_fccactualtransitloss":5.0,
  "p_fccactualtransitlossrscrores":0.005,
  "p_ioimbtfachieved":60.0,
  "p_ioiramprateacheived":0.5,
  "p_ioipeakavfachieved":90.0,
  "p_ioifgmo":1,
  "p_datedon":"2025-11-10",
  "p_userid":10,
  "p_companyid":100
}));
console.log(decryptData("eaeda7c82beb279a17534e998d3da534"));
app.listen(port, '0.0.0.0', () => { // Listen on all network interfaces
  console.log(`Server running on port ${port}`);
});