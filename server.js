const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get("/api/test", () =>{
  console.log("TEST IS SUCCESSFUL");
})
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
