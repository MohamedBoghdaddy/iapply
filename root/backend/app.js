const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/hkiaicareer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
