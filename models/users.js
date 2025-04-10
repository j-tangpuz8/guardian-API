const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  barangay: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    // enum: ['volunteer', 'Dispatcher', 'LGU', 'Responder'],
    required: false,
    default: "LGU"
}
});


const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
