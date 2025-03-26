const Incidents = require("../models/incidents");

// GET ALL INCIDENTS
const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incidents.find().populate("user", "-password");
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({message: "err fetching incidents", error});
  }
};

// GET INCIDENT BY ID
const getIncidentById = async (req, res) => {
  try {
    const incident = await Incidents.findById(req.params.id).populate(
      "user",
      "-password"
    );
    if (!incident) {
      return res.status(404).json({message: "Incident not found"});
    }
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({message: "err fetching incident", error});
  }
};

// CREATE INCIDENT
const createIncident = async (req, res) => {
  try {
    const {incidentType, isVerified, isResolved, userId} = req.body;

    if (!userId) {
      return res.status(400).json({message: "User ID is required"});
    }

    const newIncident = new Incidents({
      incidentType,
      isVerified,
      isResolved,
      user: userId,
    });

    const savedIncident = await newIncident.save();
    const populatedIncident = await savedIncident.populate("user", "-password");
    res.status(201).json(populatedIncident);
  } catch (error) {
    res.status(500).json({message: "err creating incident", error});
  }
};

// UPDATE INCIDENT
const updateIncident = async (req, res) => {
  try {
    const incident = await Incidents.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({message: "Incident not found"});
    }

    Object.keys(req.body).forEach((key) => {
      if (key !== "user") {
        incident[key] = req.body[key];
      }
    });
    const updatedIncident = await incident.save();
    const populatedIncident = await updatedIncident.populate(
      "user",
      "-password"
    );
    res.status(200).json(populatedIncident);
  } catch (error) {
    res
      .status(500)
      .json({message: "Error updating incident", error: error.message});
  }
};

module.exports = {
  getAllIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
};
