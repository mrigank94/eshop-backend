const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/doctorio")
  .then(() => console.log("Connection to mongodb successful"))
  .catch((ex) => console.log("Error occured in connection", ex));

app.get("/heartbeat", (_req, res) => {
  res.send("Application is alive");
});

require("./routes/auth.routes")(app);
require("./routes/doctor.routes")(app);
require("./routes/appointment.routes")(app);
require("./routes/user.routes")(app);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
