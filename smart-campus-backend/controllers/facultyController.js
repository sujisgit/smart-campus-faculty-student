const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

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
      return res.status(400).json({
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

// Register endpoint - creates new user and faculty account
const register = async (req, res) => {
  try {
    const { name, email, phone, department, designation, password } = req.body;

    // Validate required fields
    if (!name || !email || !department || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, department, and password are required",
      });
    }

    // Check if email already exists in users table
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Email already registered",
      });
    }

    // Check if email already exists in faculty table
    const existingFaculty = await pool.query(
      "SELECT id FROM faculty WHERE email = $1",
      [email],
    );

    if (existingFaculty.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Email already exists in faculty database",
      });
    }

    // Create faculty record first
    const facultyId = "FAC-" + uuidv4().slice(0, 8);
    const facultyResult = await pool.query(
      "INSERT INTO faculty(id, name, email, phone, department, designation) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, name, email, department, designation",
      [facultyId, name, email, phone, department, designation],
    );

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user record linked to faculty
    const userResult = await pool.query(
      "INSERT INTO users(email, password_hash, user_type, faculty_id) VALUES($1, $2, $3, $4) RETURNING id, email, user_type",
      [email, hashedPassword, "faculty", facultyId],
    );

    res.json({
      success: true,
      message: "Registration successful. You can now login.",
      data: {
        id: userResult.rows[0].id,
        email: userResult.rows[0].email,
        faculty: facultyResult.rows[0],
      },
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Registration failed" });
  }
};

// Login endpoint - validates user credentials
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    // Check if user exists in users table
    const userResult = await pool.query(
      "SELECT id, email, password_hash, user_type, faculty_id FROM users WHERE email = $1",
      [email],
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const user = userResult.rows[0];

    // Verify password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Get faculty information if user is faculty
    let facultyInfo = null;
    if (user.faculty_id) {
      const facultyResult = await pool.query(
        "SELECT id, name, email, department, designation, phone FROM faculty WHERE id = $1",
        [user.faculty_id],
      );
      if (facultyResult.rows.length > 0) {
        facultyInfo = facultyResult.rows[0];
      }
    }

    // Return user info with faculty data (you can add JWT token later)
    res.json({
      success: true,
      message: "Login successful",
      data: {
        userId: user.id,
        email: user.email,
        userType: user.user_type,
        faculty: facultyInfo,
      },
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Login failed" });
  }
};

module.exports = {
  getFaculty,
  getFacultyByDepartment,
  getFacultyById,
  addFaculty,
  login,
  register,
};
