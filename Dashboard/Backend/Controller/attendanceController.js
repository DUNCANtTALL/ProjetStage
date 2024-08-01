const { getAttendanceData } = require('../Models/attendanceModel');

const getAllAttendance = async (req, res) => {
  try {
    const data = await getAttendanceData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving attendance data', error });
  }
};

module.exports = { getAllAttendance };
