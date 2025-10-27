// // app.js

// const dotenv = require('dotenv');
// dotenv.config(); 
// const express = require('express');
// const bodyParser = require('body-parser');
// //const dotenv = require('dotenv');
// const connectDB = require('./src/config/ConnectToMongoDb');

// // Route imports
// const authRoutes = require('./src/routes/authRoutes');
// const patientRoutes = require('./src/routes/patientRoutes');
// const receptionistRoutes = require('./src/routes/receptionistRoutes');
// const doctorRoutes = require('./src/routes/doctorRoutes');
// const hospitalRoutes = require('./src/routes/hospitalRoutes');
// const appointmentRoutes = require('./src/routes/appointmentsRoutes');
// const patientAppointmentRoutes = require('./src/routes/patientAppointmentRoutes');
// const bedRoutes = require('./src/routes/bedRoutes');
// const bedAssignmentRoutes = require('./src/routes/bedAssignmentRoutes');
// const patientRecordRoutes = require('./src/routes/patientRecordRoutes');
// const patientUploadRoutes = require('./src/routes/patientUploadRoutes');
// //dotenv.config(); 

// // Initialize app
// const app = express();

// const cors = require('cors');

// // Allow requests from frontend
// app.use(cors({
//   origin: 'http://localhost:3001',
//   credentials: true,
// }));


// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(bodyParser.json());
// app.use(express.json());

// // Base route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Hospital Management System API");
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/patients", patientRoutes);
// app.use("/receptionists", receptionistRoutes);
// app.use("/doctors", doctorRoutes);
// app.use("/hospitals", hospitalRoutes);
// app.use("/api/appointments", appointmentRoutes); // General appointments
// app.use("/api/patient-appointments", patientAppointmentRoutes); // Patient-specific appointments
// app.use("/beds", bedRoutes);
// app.use("/AssignBed", bedAssignmentRoutes);
// app.use("/patient-records", patientRecordRoutes);
// app.use("/patient-uploads", patientUploadRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// app.js

const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express');
const bodyParser = require('body-parser');
//const dotenv = require('dotenv');
const connectDB = require('./src/config/ConnectToMongoDb');

// Route imports
const authRoutes = require('./src/routes/authRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
const receptionistRoutes = require('./src/routes/receptionistRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const hospitalRoutes = require('./src/routes/hospitalRoutes');
const appointmentRoutes = require('./src/routes/appointmentsRoutes');
const patientAppointmentRoutes = require('./src/routes/patientAppointmentRoutes');
const bedRoutes = require('./src/routes/bedRoutes');
const bedAssignmentRoutes = require('./src/routes/bedAssignmentRoutes');
const patientRecordRoutes = require('./src/routes/patientRecordRoutes');
const patientUploadRoutes = require('./src/routes/patientUploadRoutes');
const billingRoutes = require("./src/routes/billingRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const adminRoutes = require('./src/routes/adminRoutes');

//dotenv.config(); 

// Initialize app
const app = express();

const cors = require('cors');

// Allow requests from frontend
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));


// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to the Hospital Management System API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/receptionists", receptionistRoutes);
app.use("/doctors", doctorRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/api/appointments", appointmentRoutes); // General appointments
app.use("/api/patient-appointments", patientAppointmentRoutes); // Patient-specific appointments
app.use("/beds", bedRoutes);
app.use("/AssignBed", bedAssignmentRoutes);
app.use("/patient-records", patientRecordRoutes);
app.use("/patient-uploads", patientUploadRoutes);

app.use("/api/billing", billingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/admins", adminRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});