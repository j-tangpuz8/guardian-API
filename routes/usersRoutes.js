const express = require("express");
const {
  getUserById,
  loginUser,
  createUser,
  getAllUsers,
  getUsersByRole
} = require("../controllers/usersController");

const router = express.Router();

// GETTERS
router.get("/:id", getUserById);
router.get('/', getAllUsers);
router.get('/role/:role', getUsersByRole);

// AUTH
router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;
