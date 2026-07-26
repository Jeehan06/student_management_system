const express = require("express");
const sequelize = require("./config/database");

require("./models/Student");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Student Record System is running!");
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(" Connected to PostgreSQL successfully!");
    await sequelize.sync();
    console.log(" Database synced successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Database connection failed:");
    console.error(error);
  }
}

startServer();