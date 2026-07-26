const express = require("express");
const router = express.Router();

const Student = require("../models/Student");


// Show create student form
router.get("/new", (req, res) => {
  res.render("students/create");
});


// Show all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.findAll();

    res.render("students/index", { students });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// Show edit student form
router.get("/:id/edit", async (req, res) => {

  try {

    const student = await Student.findByPk(req.params.id);

    res.render("students/edit", { student });

  } catch(error) {

    console.error(error);
    res.status(500).send("Server Error");

  }

});


// Create student
router.post("/", async (req, res) => {
  try {

    const { name, email, course, semester } = req.body;

    await Student.create({
      name,
      email,
      course,
      semester
    });

    res.redirect("/students");

  } catch (error) {

    console.error(error);
    res.status(500).send("Server Error");

  }
});


// Update student
router.put("/:id", async (req, res) => {

  try {

    const { name, email, course, semester } = req.body;

    await Student.update(
      {
        name,
        email,
        course,
        semester
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.redirect("/students");

  } catch (error) {

    console.error(error);
    res.status(500).send("Server Error");

  }

});


// Delete student
router.delete("/:id", async (req, res) => {

  try {

    await Student.destroy({
      where: {
        id: req.params.id
      }
    });

    res.redirect("/students");

  } catch (error) {

    console.error(error);
    res.status(500).send("Server Error");

  }

});


module.exports = router;