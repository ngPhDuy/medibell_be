const service = require("../services/medicineSchedule.service");

exports.createMedicineSchedule = async (req, res) => {
  try {
    const medicineSchedule = await service.createMedicineSchedule(req.body);
    return res.status(201).json(medicineSchedule);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getMedicineSchedules = async (req, res) => {
  try {
    const { userID, startDate, endDate } = req.query;
    const medicineSchedules = await service.getMedicineSchedules(
      userID,
      startDate,
      endDate
    );
    return res.status(200).json(medicineSchedules);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.toggleMedicineSchedule = async (req, res) => {
  try {
    const medicineSchedule = await service.toggleMedicineSchedule(
      req.params.id
    );
    return res.status(200).json(medicineSchedule);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getMedicineSchedulesById = async (req, res) => {
  try {
    const medicineSchedule = await service.getMedicineSchedulesById(
      req.params.id
    );
    return res.status(200).json(medicineSchedule);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
