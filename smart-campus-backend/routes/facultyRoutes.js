const express = require("express");
const router = express.Router();

const facultyController = require("../controllers/facultyController");

// Get all faculty
router.get("/faculty", facultyController.getFaculty);

// Get faculty by department
router.get("/faculty-department", facultyController.getFacultyByDepartment);

// Get faculty by ID
router.get("/faculty/:id", facultyController.getFacultyById);

// Add faculty (admin)
router.post("/faculty", facultyController.addFaculty);

module.exports = router;
