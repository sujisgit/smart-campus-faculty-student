const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const registerEvent = async (req, res) => {
  try {
    console.log("Incoming request:", req.body);

    const { name, department, email, phone, year } = req.body;

    const ticketId = "EVT-" + uuidv4().slice(0, 6);

    await pool.query(
      "INSERT INTO registrations(name, department, email, phone, year, ticket_id) VALUES($1,$2,$3,$4,$5,$6)",
      [name, department, email, phone, year, ticketId],
    );

    console.log("Inserted successfully");

    res.json({
      success: true,
      ticketId,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const getNotifications = (req, res) => {
  res.json([]);
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY event_date ASC",
    );
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Failed to fetch events" });
  }
};

// Get event details
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Failed to fetch event" });
  }
};

module.exports = { registerEvent, getNotifications, getEvents, getEventById };
