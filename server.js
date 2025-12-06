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
  "p_currentmod": 0,
  "p_currentcoalfactor": 0,
  "p_generationmus": 0,
  "p_apcmus": 0,
  "p_rawcoalblendingachieved": 0,
  "p_washedcoalblendingachieved": 0,
  "p_importedcoalblendingachieved": 0,
  "p_rawconsumption": 0,
  "p_rawgcv": 0,
  "p_rawlandedcost": 0,
  "p_rawclosingbalance": 0,
  "p_washedconsumption": 0,
  "p_washedgcv": 0,
  "p_washedlandedcost": 0,
  "p_washedclosingbalance": 0,
  "p_importedconsumption": 0,
  "p_importedgcv": 0,
  "p_importedlandedcost": 0,
  "p_importedclosingbalance": 0,
  "p_ldoconsumption": 0,
  "p_ldogcv": 0,
  "p_ldolandedcost": 0,
  "p_ldoclosingbalance": 0,
  "p_foconsumption": 0,
  "p_fogcv": 0,
  "p_folandedcost": 0,
  "p_foclosingbalance": 0,
  "p_othervariablecosts": 0,
  "p_achievedblendedgcv": 0,
  "p_achievedheatrate": 0,
  "p_expectedmodforupcomingmonth": 0,
  "p_datedon": "2025-01-01",
  "p_insflag": "I",

  "p_targetcoalfactor": 0,
  "p_expectedgenerationmus": 0,
  "p_expectedapcmus": 0,
  "p_rawtargetcoalblending": 0,
  "p_washedtargetcoalblending": 0,
  "p_importedtargetcoalblending": 0,
  "p_expectedldoconsumption": 0,
  "p_expectedfoconsumption": 0,
  "p_expectedrawgcv": 0,
  "p_expectedwashedgcv": 0,
  "p_expectedimportedgcv": 0,
  "p_expectedldogcv": 0,
  "p_expectedfogcv": 0,
  "p_expectedrawlandedcost": 0,
  "p_expectedwashedlandedcost": 0,
  "p_expectedimportedlandedcost": 0,
  "p_expectedldolandedcost": 0,
  "p_expectedfolandedcost": 0
}
));
console.log(decryptData("eaeda7c82beb279a17534e998d3da534"));
app.listen(port, '0.0.0.0', () => { // Listen on all network interfaces
  console.log(`Server running on port ${port}`);
});