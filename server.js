const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const res = require("express/lib/response");

dotenv.config();

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'))

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
