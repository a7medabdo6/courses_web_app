const express = require("express");
const connectDB = require("./models");
const env = process.env.NODE_ENV || "development";

const app = express();

//Connect Database
connectDB.Sequelize;
//Init Middleware
app.use(express.json({ extended: false }));
//Define route
app.use("/", require("./routes/User"));
app.use("/", require("./routes/Category"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on ports ${PORT} `);
});
