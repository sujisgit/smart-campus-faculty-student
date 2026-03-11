const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Get all complaints
const getComplaints = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM complaints ORDER BY created_at DESC",
    );
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch complaints" });
  }
};

// Get user's complaints
const getUserComplaints = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }

    const result = await pool.query(
      "SELECT * FROM complaints WHERE email = $1 ORDER BY created_at DESC",
      [email],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch complaints" });
  }
};

// Create a complaint
const createComplaint = async (req, res) => {
  try {
    const { title, description, category, name, email, phone } = req.body;

    if (!title || !description || !email) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Title, description, and email are required",
        });
    }

    const complaint_id = "CMP-" + uuidv4().slice(0, 8);

    const result = await pool.query(
      "INSERT INTO complaints(complaint_id, title, description, category, name, email, phone, status, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, 'open', NOW()) RETURNING *",
      [
        complaint_id,
        title,
        description,
        category || "General",
        name,
        email,
        phone,
      ],
    );

    res.json({
      success: true,
      data: result.rows[0],
      message: "Complaint submitted successfully",
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to submit complaint" });
  }
};

// Update complaint status
const updateComplaintStatus = async (req, res) => {
  try {
    const { complaint_id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, error: "Status is required" });
    }

    const result = await pool.query(
      "UPDATE complaints SET status = $1, updated_at = NOW() WHERE complaint_id = $2 RETURNING *",
      [status, complaint_id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Complaint not found" });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: "Complaint status updated successfully",
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update complaint" });
  }
};

module.exports = {
  getComplaints,
  getUserComplaints,
  createComplaint,
  updateComplaintStatus,
};
