const express = require('express');
const app = express();
const port = 3000;

const attendanceRoutes = require('./Routes/attendanceRoutes'); 

app.use(express.json());
app.use('/api', attendanceRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
