const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");

// Register event
router.post("/register-event", eventController.registerEvent);

// Notifications
router.get("/notifications", eventController.getNotifications);

// Get all events
router.get("/events", eventController.getEvents);

// Get event by ID
router.get("/events/:id", eventController.getEventById);

module.exports = router;
