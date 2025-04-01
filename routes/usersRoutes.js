const express = require("express");
const {
  getUserById,
  loginUser,
  createUser,
} = require("../controllers/usersController");

const router = express.Router();

// GETTERS
router.get("/:id", getUserById);

// AUTH
router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;
