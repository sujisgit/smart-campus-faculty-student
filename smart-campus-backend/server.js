require("dotenv").config();
const express = require("express");
const cors = require("cors");

const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Campus Backend Running 🚀");
});

app.use("/", eventRoutes);
app.use("/", announcementRoutes);
app.use("/", facilityRoutes);
app.use("/", facultyRoutes);
app.use("/", complaintRoutes);

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (${ENV})`);
});
