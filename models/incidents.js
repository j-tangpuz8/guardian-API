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
    dispatcher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
      default: null,
    },
    lgu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
      default: null,
    },
    lguStatus: {
      type: String,
      enum: ["idle", "connecting", "connected"],
      default: "idle",
    },
    responder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
      default: null,
    },
    isAcceptedResponder: {
      type: Boolean,
      required: false,
      default: false,
    },
    responderStatus: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: false,
      default: null,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: false,
      default: null,
    },
    incidentDetails: {
      incident: {
        type: String,
        required: false,
        default: null,
      },
      incidentDescription: {
        type: String,
        required: false,
        default: null,
      },
      coordinates: {
        lat: {
          type: Number,
          required: false,
          default: null,
        },
        lon: {
          type: Number,
          required: false,
          default: null,
        },
      },
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
