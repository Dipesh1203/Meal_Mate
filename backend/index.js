const express = require("express");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("app is listening on post 5000");
});
