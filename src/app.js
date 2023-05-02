const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./auth");
const userRoutes = require("./user");
require("dotenv").config();

app.use(cors());

const DB =
  "mongodb+srv://Rajat:Rajat007@atlascluster.uftel3n.mongodb.net/apibackend?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

// Mount auth routes
app.use("/auth", authRoutes);

// Mount user routes
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log(`server started at 3000`);
});
