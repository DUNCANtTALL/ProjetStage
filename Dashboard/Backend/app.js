const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;

const attendanceRoutes = require('./Routes/attendanceRoutes'); 

app.use(cors({
  origin: 'http://localhost:3001', // Replace with your React app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api', attendanceRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
