const {
  MedicationSchedule,
  Prescription,
  PrescriptionContainsMedicine,
  sequelize,
  MedicineInSingleDose,
} = require("../models/index");
const { Op } = require("sequelize");

/*props:
id_nguoi_dung
ngay_bat_dau
ngay_ket_thuc
ten_don_thuoc
Don_chua_thuoc: [{
    thuoc
    tong_so
    buoi_uong: Là mảng gồm các buổi uống, cách nhau bởi dấu phẩy
    ghi_chu
    }]
*/
exports.createMedicineSchedule = async (medicineSchedule) => {
  const {
    id_nguoi_dung,
    ngay_bat_dau,
    ngay_ket_thuc,
    ten_don_thuoc,
    Don_chua_thuoc,
  } = medicineSchedule;

  if (
    !id_nguoi_dung ||
    !ngay_bat_dau ||
    !ngay_ket_thuc ||
    !ten_don_thuoc ||
    !Don_chua_thuoc
  ) {
    throw new Error("Missing required fields");
  }

  if (Don_chua_thuoc && Don_chua_thuoc.length === 0) {
    throw new Error("Don_chua_thuoc cannot be empty");
  }

  const newPrescription = await Prescription.create({
    id_nguoi_dung,
    ngay_bat_dau,
    ngay_ket_thuc,
    ten_don_thuoc,
    trang_thai: "Đang chờ",
  });

  const prescriptionContainsMedicines = Don_chua_thuoc.map((item) => ({
    id_don_thuoc: newPrescription.id,
    thuoc: item.thuoc,
    tong_so: item.tong_so,
    buoi_uong: item.buoi_uong,
    ghi_chu: item.ghi_chu,
  }));

  await PrescriptionContainsMedicine.bulkCreate(prescriptionContainsMedicines);

  const procedureCall = sequelize.query(
    `
    CALL Tao_lich_uong_tu_don_thuoc(:id_don_thuoc);
  `,
    {
      replacements: {
        id_don_thuoc: newPrescription.id,
      },
    }
  );

  return newPrescription;
};

exports.getMedicineSchedules = async (userID, startDate, endDate) => {
  const schedules = await Prescription.findAll({
    where: {
      id_nguoi_dung: userID,
    },
    include: [
      {
        model: MedicationSchedule,
        as: "Lan_uong",
        where: {
          ngay: {
            [Op.between]: [startDate, endDate],
          },
        },
      },
    ],
    order: [["ngay_bat_dau", "ASC"]],
  });

  return schedules;
};

exports.toggleMedicineSchedule = async (scheduleID) => {
  const schedule = await MedicationSchedule.findOne({
    where: {
      id: scheduleID,
    },
  });

  if (!schedule) {
    return null;
  }

  const usedTime = schedule.thoi_diem_da_uong;
  const currentTime = new Date().getTime();

  if (usedTime) {
    schedule.thoi_diem_da_uong = null;

    await schedule.save();
    return schedule;
  }

  //Lấy thời điểm uống đã đặt từ ngay và gio
  const timeToTake = new Date(schedule.ngay + " " + schedule.gio).getTime();

  //Định dạng thời gian đã uống: 2025-03-18 15:42:33.059
  const formattedTime = new Date();
  console.log("formattedTime", formattedTime);
  schedule.thoi_diem_da_uong = formattedTime;
  await schedule.save();

  return schedule;
};

exports.getMedicineSchedulesById = async (scheduleID) => {
  const schedule = await MedicationSchedule.findOne({
    where: {
      id: scheduleID,
    },
    include: [
      {
        model: MedicineInSingleDose,
        as: "Thuoc_trong_mot_lan_uong",
      },
      {
        model: Prescription,
        as: "Don_thuoc",
      },
    ],
  });

  return schedule;
};
