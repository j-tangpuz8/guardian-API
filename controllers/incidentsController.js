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

// fetch recent incident for ersponder app
const getRecentIncidentforResponder = async (req, res) => {
  try {
    const recentIncident = await Incidents.findOne({
      isVerified: true,
      isAccepted: true,
      isResolved: false,
    })
      .sort({createdAt: -1})
      .populate("user", "-password")
      .populate("dispatcher", "-password")
      .populate("lgu", "-password");

    if (!recentIncident) {
      return res.status(404).json({message: "No recent incidents found"});
    }

    res.status(200).json(recentIncident);
  } catch (error) {
    res.status(500).json({message: "Error fetching recent incident", error});
  }
};

// CREATE INCIDENT
const createIncident = async (req, res) => {
  try {
    const {
      incidentType,
      isVerified,
      isResolved,
      isAccepted,
      userId,
      incidentDetails,
    } = req.body;

    if (!userId) {
      return res.status(400).json({message: "Volunteer User ID is required"});
    }

    const newIncident = new Incidents({
      incidentType,
      isVerified,
      isResolved,
      isAccepted,
      user: userId,
      incidentDetails: incidentDetails || {
        incident: null,
        incidentDescription: null,
        coordinates: {
          lat: null,
          lon: null,
        },
      },
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

    // Explicitly update fields
    if (req.body.isAccepted !== undefined) {
      incident.isAccepted = req.body.isAccepted;
    }
    if (req.body.dispatcher !== undefined) {
      incident.dispatcher = req.body.dispatcher;
    }
    // Update any other fields that might be present
    Object.keys(req.body).forEach((key) => {
      if (key !== "user" && key !== "isAccepted" && key !== "dispatcher") {
        incident[key] = req.body[key];
      }
    });

    const updatedIncident = await incident.save();
    const populatedIncident = await updatedIncident.populate(
      "user dispatcher",
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
  getRecentIncidentforResponder,
  createIncident,
  updateIncident,
};
