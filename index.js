const express = require("express");
const sequelize = require("./config/database");
const methodOverride = require("method-override");

require("./models/Student");

const studentRoutes = require("./routes/students");


const app = express();


// View engine
app.set("view engine", "ejs");


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));


// Routes
app.use("/students", studentRoutes);


const PORT = 3000;


// Home route
app.get("/", (req, res) => {
  res.send("Student Record System is running!");
});


// Start server
async function startServer() {

  try {

    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL successfully!");

    await sequelize.sync();
    console.log("✅ Database synced successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });


  } catch (error) {

    console.error("❌ Database connection failed:");
    console.error(error);

  }

}


startServer();