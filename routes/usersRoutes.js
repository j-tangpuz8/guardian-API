const express = require("express");
const {getUserById, createUser} = require("../controllers/usersController");

const router = express.Router();

// GETTERS
router.get("/:id", getUserById);

// POSTERS
router.post("/", createUser);

module.exports = router;
