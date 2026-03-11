const express = require("express");
const router = express.Router();

const announcementController = require("../controllers/announcementController");

// Get all announcements
router.get("/announcements", announcementController.getAnnouncements);

// Create announcement (admin)
router.post("/announcements", announcementController.createAnnouncement);

module.exports = router;
