const Users = require("../models/users");

// GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({message: "Error fetching user", error: error.message});
  }
};

// CREATE USER
const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      address,
      barangay,
      city,
    } = req.body;

    // Check if user already exists
    const existingUser = await Users.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: "Email already registered"});
    }

    const newUser = new Users({
      firstName,
      lastName,
      email,
      phone,
      password,
      address,
      barangay,
      city,
    });

    const savedUser = await newUser.save();
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res
      .status(500)
      .json({message: "Error creating user", error: error.message});
  }
};

module.exports = {
  getUserById,
  createUser,
};
