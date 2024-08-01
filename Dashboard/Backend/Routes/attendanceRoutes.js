const express = require('express');
const router = express.Router();
const { getAllAttendance } = require('../Controller/attendanceController');

router.get('/attendance', getAllAttendance);

module.exports = router;
