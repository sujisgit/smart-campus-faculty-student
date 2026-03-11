const express = require("express");
const router = express.Router();

const facilityController = require("../controllers/facilityController");

// Get all facilities
router.get("/facilities", facilityController.getFacilities);

// Book a facility
router.post("/facility-booking", facilityController.bookFacility);

// Get user's bookings
router.get("/my-bookings", facilityController.getUserBookings);

// Cancel a facility booking
router.delete(
  "/facility-booking/:booking_id",
  facilityController.cancelBooking,
);

module.exports = router;
