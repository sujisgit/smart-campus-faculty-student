const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Get all faculty
const getFaculty = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM faculty ORDER BY department ASC, name ASC",
    );
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Failed to fetch faculty" });
  }
};

// Get faculty by department
const getFacultyByDepartment = async (req, res) => {
  try {
    const { department } = req.query;

    if (!department) {
      return res
        .status(400)
        .json({ success: false, error: "Department is required" });
    }

    const result = await pool.query(
      "SELECT * FROM faculty WHERE department = $1 ORDER BY name ASC",
      [department],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Failed to fetch faculty" });
  }
};

// Get faculty by ID
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM faculty WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Faculty member not found" });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Failed to fetch faculty" });
  }
};

// Add faculty (admin only)
const addFaculty = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      designation,
      office_location,
      specialization,
    } = req.body;

    if (!name || !email || !department) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Name, email, and department are required",
        });
    }

    const id = "FAC-" + uuidv4().slice(0, 8);

    const result = await pool.query(
      "INSERT INTO faculty(id, name, email, phone, department, designation, office_location, specialization) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        id,
        name,
        email,
        phone,
        department,
        designation,
        office_location,
        specialization,
      ],
    );

    res.json({
      success: true,
      data: result.rows[0],
      message: "Faculty member added successfully",
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to add faculty member" });
  }
};

module.exports = {
  getFaculty,
  getFacultyByDepartment,
  getFacultyById,
  addFaculty,
};
