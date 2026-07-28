const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const authenticateToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

// Validation rules
const studentValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("course")
    .isIn(["CSE", "ECE", "ME", "CE"])
    .withMessage("Please select a valid course"),

  body("semester")
    .isInt({ min: 1, max: 8 })
    .withMessage("Semester must be between 1 and 8"),
];

// =============================
// Protected REST API
// =============================
router.get("/api", authenticateToken, async (req, res) => {

  try {

    const students = await Student.findAll();

    res.json({
      loggedInUser: req.user.username,
      totalStudents: students.length,
      students,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

// Show create student form
router.get("/new", (req, res) => {
  res.render("students/create", {
    errors: [],
    student: {},
  });
});

// Show all students
router.get("/", async (req, res) => {

  try {

    const students = await Student.findAll();

    const totalStudents = students.length;

    const cseCount = students.filter(
      student => student.course === "CSE"
    ).length;

    const eceCount = students.filter(
      student => student.course === "ECE"
    ).length;

    const meCount = students.filter(
      student => student.course === "ME"
    ).length;

    const ceCount = students.filter(
      student => student.course === "CE"
    ).length;

    res.render("students/index", {
      students,
      totalStudents,
      cseCount,
      eceCount,
      meCount,
      ceCount,
    });

  } catch (error) {

    console.error(error);
    res.status(500).send("Server Error");

  }

});

// Show edit student form
router.get("/:id/edit", async (req, res) => {

  try {

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      req.flash("error", "Student not found.");
      return res.redirect("/students");
    }

    res.render("students/edit", {
      student,
      errors: [],
    });

  } catch (error) {

    console.error(error);
    req.flash("error", "Something went wrong.");
    res.redirect("/students");

  }

});

// Create student
router.post("/", studentValidation, async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.render("students/create", {
      errors: errors.array(),
      student: req.body,
    });

  }

  try {

    const { name, email, course, semester } = req.body;

    await Student.create({
      name,
      email,
      course,
      semester,
    });

    req.flash("success", "Student added successfully!");
    res.redirect("/students");

  } catch (error) {

    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {

      req.flash(
        "error",
        "Email already exists. Please use another email."
      );

    } else {

      req.flash(
        "error",
        "Unable to add student."
      );

    }

    res.redirect("/students/new");

  }

});

// Update student
router.put("/:id", studentValidation, async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.render("students/edit", {
      errors: errors.array(),
      student: {
        id: req.params.id,
        ...req.body,
      },
    });

  }

  try {

    const { name, email, course, semester } = req.body;

    await Student.update(
      {
        name,
        email,
        course,
        semester,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    req.flash("success", "Student updated successfully!");
    res.redirect("/students");

  } catch (error) {

    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {

      req.flash(
        "error",
        "Email already exists. Please use another email."
      );

    } else {

      req.flash(
        "error",
        "Unable to update student."
      );

    }

    res.redirect(`/students/${req.params.id}/edit`);

  }

});

// Delete student
router.delete("/:id", async (req, res) => {

  try {

    await Student.destroy({
      where: {
        id: req.params.id,
      },
    });

    req.flash("success", "Student deleted successfully!");
    res.redirect("/students");

  } catch (error) {

    console.error(error);
    req.flash("error", "Unable to delete student.");
    res.redirect("/students");

  }

});

module.exports = router;