const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaintController");

// Get all complaints
router.get("/complaints", complaintController.getComplaints);

// Get user's complaints
router.get("/my-complaints", complaintController.getUserComplaints);

// Create a complaint
router.post("/complaint", complaintController.createComplaint);

// Update complaint status
router.put(
  "/complaint/:complaint_id",
  complaintController.updateComplaintStatus,
);

module.exports = router;
