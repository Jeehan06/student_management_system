const express = require("express");
const sequelize = require("./config/database");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

require("./models/Student");

const studentRoutes = require("./routes/students");
const authRoutes = require("./routes/auth");
const pageRoutes = require("./routes/pages");

const app = express();

// View Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "student-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.static("public"));

// Routes
app.use("/", pageRoutes);
app.use("/api/auth", authRoutes);
app.use("/students", studentRoutes);

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL successfully!");

    await sequelize.sync();
    console.log("✅ Database synced successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();