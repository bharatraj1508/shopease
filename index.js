require("dotenv").config();
require("./src/models/user");
require("./src/models/order");
require("./src/models/product");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo instance");
});

mongoose.connection.on("error", (error) => [
  console.log("Error connecting to mongo instance", error),
]);

app.use("/auth", authRoutes);
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is online" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
