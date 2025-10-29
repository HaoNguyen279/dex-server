const express = require('express');
const StudyController = require("../app/controllers/StudyController");
const router = express.Router();

router.get("/pomodoro", StudyController.index);

router.post("/addStreak", StudyController.addStreak);

module.exports = router;