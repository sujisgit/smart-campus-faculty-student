const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Get all announcements
const getAnnouncements = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM announcements ORDER BY created_at DESC",
    );
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch announcements" });
  }
};

// Create announcement (admin only)
const createAnnouncement = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, error: "Title and description required" });
    }

    const id = "ANN-" + uuidv4().slice(0, 8);

    const result = await pool.query(
      "INSERT INTO announcements(id, title, description, category, created_at) VALUES($1, $2, $3, $4, NOW()) RETURNING *",
      [id, title, description, category || "General"],
    );

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to create announcement" });
  }
};

module.exports = { getAnnouncements, createAnnouncement };
