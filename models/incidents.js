const mongoose = require("mongoose");

const incidentsSchema = new mongoose.Schema(
  {
    incidentType: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isResolved: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Incidents = mongoose.model("Incidents", incidentsSchema);
module.exports = Incidents;
