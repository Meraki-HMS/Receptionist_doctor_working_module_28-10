const express = require("express");
const router = express.Router();
const { registerReceptionist, loginReceptionist,getDoctorsByHospital } = require("../controllers/receptionistController");
const { isLoggedIn } = require("../middleware/authMiddleware");
// Register
router.post("/register", registerReceptionist);

// Login
router.post("/login", loginReceptionist);


router.get("/doctors/:hospitalId", isLoggedIn, getDoctorsByHospital);//---------------------------


module.exports = router;
