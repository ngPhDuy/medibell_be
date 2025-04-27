const { Medicine } = require("../models");

exports.getAllMedicines = async () => {
  try {
    const medicines = await Medicine.findAll({
      where: { bi_xoa: false },
    });
    return medicines;
  } catch (error) {
    throw new Error("Error fetching medicines: " + error.message);
  }
};

exports.getMedicineById = async (id) => {
  try {
    const medicine = await Medicine.findOne({
      where: { id, bi_xoa: false },
    });
    return medicine;
  } catch (error) {
    throw new Error("Error fetching medicine: " + error.message);
  }
};

exports.createMedicine = async (medicineData) => {
  try {
    const { ten_thuoc, mo_ta, don_vi, cong_dung, cach_dung, chong_chi_dinh } =
      medicineData;

    if (
      !ten_thuoc ||
      !mo_ta ||
      !don_vi ||
      !cong_dung ||
      !cach_dung ||
      !chong_chi_dinh
    ) {
      throw new Error("All fields are required");
    }

    const medicine = await Medicine.create({
      ten_thuoc,
      mo_ta,
      don_vi,
      cong_dung,
      cach_dung,
      chong_chi_dinh,
    });

    return medicine;
  } catch (error) {
    throw new Error("Error creating medicine: " + error.message);
  }
};

exports.updateMedicine = async (id, medicineData) => {
  try {
    const {
      ten_thuoc,
      mo_ta,
      don_vi,
      cong_dung,
      cach_dung,
      chong_chi_dinh,
      url,
    } = medicineData;

    const medicine = await Medicine.findOne({
      where: { id, bi_xoa: false },
    });

    if (!medicine) {
      throw new Error("Medicine not found");
    }

    if (ten_thuoc) medicine.ten_thuoc = ten_thuoc;
    if (mo_ta) medicine.mo_ta = mo_ta;
    if (don_vi) medicine.don_vi = don_vi;
    if (cong_dung) medicine.cong_dung = cong_dung;
    if (cach_dung) medicine.cach_dung = cach_dung;
    if (chong_chi_dinh) medicine.chong_chi_dinh = chong_chi_dinh;
    if (url) medicine.url = url;

    await medicine.update(medicineData);

    return medicine;
  } catch (error) {
    throw new Error("Error updating medicine: " + error.message);
  }
};
