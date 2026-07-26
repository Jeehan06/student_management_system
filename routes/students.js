const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

router.get("/", async (req, res) => {
  try {
    const students = await Student.findAll();

    res.render("students/index", { students });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;