const Users = require("../models/users");
const {StreamChat} = require("stream-chat");
require("dotenv").config();

// Variables
// const {PORT, STREAM_API_KEY, STREAM_API_SECRET} = process.env;
const STREAM_API_KEY = "ev66gd84qdfd";
const STREAM_API_SECRET =
  "5mes2mbjk5uhqp3gp2gr537n8pwwg8m4umpcntegehjgkzn3pjgvhagr93ayn4d7";
const client = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);
const salt = 10;

//////////////////////// < user functions > /////////////////////////////////////////
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

//////////////////////// < user AUTHENTICATION functions > /////////////////////////////////////////
// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({message: "Email and password are required"});
    }
    const user = await Users.findOne({email});
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    const streamUserId = user._id.toString();
    const token = client.createToken(streamUserId);

    res.status(200).json({
      ...user.toObject(),
      token,
      user: {id: streamUserId, email},
      message: "User logged in successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({message: "Error logging in user", error: error.message});
  }
};

// REGISTER USER
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

    if (!email || !password) {
      return res.status(400).json({message: "Emall and password are required"});
    }

    // Check if user already exists
    const existingUser = await Users.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({message: "User already exists. Email has been registered"});
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

    const streamUserId = newUser._id.toString();
    await client.upsertUser({
      id: streamUserId,
      email,
    });

    const token = client.createToken(streamUserId);

    res.status(201).json({
      token,
      user: {id: streamUserId, email},
      message: "User registered successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({message: "Error creating user", error: error.message});
  }
};

module.exports = {
  getUserById,
  loginUser,
  createUser,
};
