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
  UnitName : 'BSL Unit-3',
  Gross : 10,
  APC : 8,
  PRaw : 40,
  PWash : 40,
  PImp : 20,
  GCVRaw : 3500,
  GCVWash : 4200,
  GCVImp : 5200,
  CRaw : 1800,
  CWash : 2600,
  CImp : 5000,
  HR : 2350,
  Freight : 800,
  Handling : 150

}
));
console.log(decryptData("b9c7c025eece706db89403e6eed16657b9a283794ad41f8cee930488e28d090d287305e1e2051afd64789f90a5a4b801a4d3f5df94b3abb9a34438b433b0f002f67da24de905c18580ba8669bd25be79fd12258807fbd8b9132b5167fd2dc15f002e551b0a9015304c6821901b7bb35917ee64e08ffdc965dfdc1d3ab3a7e68b007e9c9c9f5dba42ae9451318d6c928dcae74d314a7910ec152a89003c346571adb62805141c1f1ed83ce683d337814aa37f72a9622708b02390f7e57b2bc17e287cefb2ff7071c2800d81b1846cd5d6"));
app.listen(port, '0.0.0.0', () => { // Listen on all network interfaces
  console.log(`Server running on port ${port}`);
});