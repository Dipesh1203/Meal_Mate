const express = require("express");
const cors = require("cors"); // Import cors
require("dotenv").config();
const auth = require("./routers/auth.routes");
const provider = require("./routers/provider.routes");
const providerList = require("./routers/get.routes");
const reciver = require("./routers/reciver.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", auth);
app.use("/provider", provider);
app.use("/provider_list", providerList);
app.use("/reciver", reciver);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
