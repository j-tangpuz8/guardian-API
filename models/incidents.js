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
    isAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    acceptedAt: {
      type: Date,
      default: null,
    },
    resolvedAt: {
      type: Date,
      default: null,
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

incidentsSchema.pre("save", function (next) {
  if (this.isAccepted && !this.acceptedAt) {
    this.acceptedAt = new Date();
  }

  if (this.isResolved && !this.resolvedAt) {
    this.resolvedAt = new Date();
  }
  next();
});

const Incidents = mongoose.model("Incidents", incidentsSchema);
module.exports = Incidents;
