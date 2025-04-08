const express = require("express");
const {
  getAllIncidents,
  getIncidentById,
  getRecentIncidentforResponder,
  createIncident,
  updateIncident,
} = require("../controllers/incidentsController");

const router = express.Router();

// GETTERS
router.get("/", getAllIncidents);
router.get("/:id", getIncidentById);
router.get("/responder/recent", getRecentIncidentforResponder);

// POSTERS
router.post("/", createIncident);

// UPDATERS
router.put("/update/:id", updateIncident);

module.exports = router;
