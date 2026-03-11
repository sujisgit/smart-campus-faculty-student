const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Get all facilities
const getFacilities = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM facilities ORDER BY name ASC",
    );
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch facilities" });
  }
};

// Book a facility
const bookFacility = async (req, res) => {
  try {
    const { facility_id, user_name, email, phone, date, time_slot, purpose } =
      req.body;

    if (!facility_id || !user_name || !email || !date || !time_slot) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const booking_id = "BOOK-" + uuidv4().slice(0, 8);

    const result = await pool.query(
      "INSERT INTO facility_bookings(booking_id, facility_id, user_name, email, phone, booking_date, time_slot, purpose, status, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, 'pending', NOW()) RETURNING *",
      [
        booking_id,
        facility_id,
        user_name,
        email,
        phone,
        date,
        time_slot,
        purpose,
      ],
    );

    res.json({
      success: true,
      data: result.rows[0],
      message: "Booking request submitted successfully",
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Failed to book facility" });
  }
};

// Get user's bookings
const getUserBookings = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }

    const result = await pool.query(
      "SELECT fb.*, f.name as facility_name FROM facility_bookings fb JOIN facilities f ON fb.facility_id = f.id WHERE fb.email = $1 ORDER BY fb.created_at DESC",
      [email],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;

    const result = await pool.query(
      "UPDATE facility_bookings SET status = 'cancelled' WHERE booking_id = $1 RETURNING *",
      [booking_id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Booking not found" });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    res.status(500).json({ success: false, error: "Failed to cancel booking" });
  }
};

module.exports = {
  getFacilities,
  bookFacility,
  getUserBookings,
  cancelBooking,
};
