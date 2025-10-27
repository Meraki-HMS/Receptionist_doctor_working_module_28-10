const Billing = require("../models/Billing");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const ReceptionistPatient = require("../models/receptionist_patient");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
//Hospital
function getAge(dob) {
  if (!dob) return "—";
  const diff = Date.now() - new Date(dob).getTime();
  const ageDt = new Date(diff);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}
// 🧾 Create new bill
exports.createBill = async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      appointment_id,
      hospital_id,
      patientName,
      contact,
      gender,
      age,
      doctorName,
      services,
      totalAmount,
      paymentMode,
      paymentStatus,
      date,
    } = req.body;

    // 🧩 Validation check
    if (!patient_id || !doctor_id || !appointment_id || !hospital_id) {
      return res.status(400).json({
        message: "Patient, Doctor, Appointment, and Hospital IDs are required",
      });
    }

    // 🧾 Create bill object
    const bill = new Billing({
      patient_id,
      doctor_id,
      appointment_id,
      hospital_id,
      patientName,
      contact,
      gender,
      age,
      doctorName,
      services,
      totalAmount,
      paymentMode,
      paymentStatus,
      date,
    });

    await bill.save();

    res.status(201).json({
      message: "Bill created successfully",
      bill,
    });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(400).json({ message: error.message });
  }
};

// 📋 Get all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Billing.find()
      .populate("patient_id", "name")
      .populate("doctor_id", "name specialization")
      .sort({ date: -1 });

    res.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Get bill by ID
exports.getBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const bill = await Billing.findById(id)
      .populate("patient_id", "name contact")
      .populate("doctor_id", "name specialization")
      .lean();

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // 🏥 Fetch hospital details using correct field name
    const hospital = await Hospital.findOne({
      hospital_id: bill.hospital_id,
    }).lean();

    const fullBill = {
      ...bill,
      hospital: hospital
        ? {
            name: hospital.name,
            address: hospital.address,
            contact: hospital.contact,
            email: hospital.email,
          }
        : null,
    };

    res.json(fullBill);
  } catch (error) {
    console.error("Error fetching bill by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// 📅 Get billing info from Appointment
// 📅 Get billing info from Appointment
exports.getBillingInfoByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // 🔹 Fetch related doctor and patient
    const doctor = await Doctor.findById(appointment.doctorId).lean();
    const patient =
      (await Patient.findById(appointment.patientId).lean()) ||
      (await ReceptionistPatient.findById(appointment.patientId).lean());

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // 📊 Compose billing info
    const billingInfo = {
      appointment_id: appointment._id,
      hospital_id: appointment.hospitalId || "—",
      patient_id: patient._id,
      doctor_id: doctor?._id,
      patient: {
        name:
          patient.name ||
          `${patient.firstName || ""} ${patient.lastName || ""}`.trim(),
        contact: patient.mobile || patient.phone || "—",
        gender: patient.gender || "—",
        age: patient.age || (patient.dob ? getAge(patient.dob) : "—"),
      },
      doctorName: doctor ? doctor.name : "—",
      appointmentDate: appointment.date,
    };

    res.json(billingInfo);
  } catch (error) {
    console.error("Billing info fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};
