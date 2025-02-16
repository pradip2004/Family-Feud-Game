const express = require("express");
const { getAllQuestions } = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/", authMiddleware, getAllQuestions);
router.get("/",  getAllQuestions);

module.exports = router;
