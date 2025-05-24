const { Medicine, Ingredient } = require("../models");

exports.getAllMedicines = async (userID) => {
  try {
    console.log("userID", userID);
    const medicines = await Medicine.findAll({
      where: { bi_xoa: false, id_nguoi_dung: userID },
      include: [
        {
          model: Ingredient,
          as: "Thanh_phan",
          attributes: ["ten_thanh_phan", "ham_luong"],
        },
      ],
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
      include: [
        {
          model: Ingredient,
          as: "Thanh_phan",
          attributes: ["ten_thanh_phan", "ham_luong"],
        },
      ],
    });
    return medicine;
  } catch (error) {
    throw new Error("Error fetching medicine: " + error.message);
  }
};

exports.createMedicine = async (medicineData) => {
  try {
    const {
      ten_thuoc,
      mo_ta,
      don_vi,
      quy_che, // thay cho cong_dung
      cach_dung,
      url,
      id_nguoi_dung,
      Thanh_phan,
    } = medicineData;

    if (
      !ten_thuoc ||
      !mo_ta ||
      !don_vi ||
      !quy_che ||
      !cach_dung ||
      !id_nguoi_dung
    ) {
      throw new Error("Thiếu thông tin thuốc. Vui lòng kiểm tra lại.");
    }

    if (!Thanh_phan || Thanh_phan.length === 0) {
      throw new Error(
        "Thiếu thông tin thành phần thuốc. Vui lòng kiểm tra lại."
      );
    }

    const medicine = await Medicine.create({
      ten_thuoc,
      mo_ta,
      don_vi,
      quy_che,
      cach_dung,
      url,
      id_nguoi_dung,
    });

    //Thêm thành phần thuốc vào bảng Ingredient
    const ingredients = Thanh_phan.map((item) => {
      return {
        thuoc_id: medicine.id,
        ten_thanh_phan: item.ten_thanh_phan,
        ham_luong: item.ham_luong,
      };
    });
    await Ingredient.bulkCreate(ingredients);

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
      Thanh_phan,
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

    if (Thanh_phan && Thanh_phan.length > 0) {
      //Xóa các thành phần cũ
      Ingredient.destroy({
        where: {
          thuoc_id: id,
        },
      });

      //Thêm các thành phần mới
      const ingredients = Thanh_phan.map((item) => {
        return {
          thuoc_id: id,
          ten_thanh_phan: item.ten_thanh_phan,
          ham_luong: item.ham_luong,
        };
      });

      await Ingredient.bulkCreate(ingredients);
    }

    medicine.save();

    return medicine;
  } catch (error) {
    throw new Error("Error updating medicine: " + error.message);
  }
};

exports.deleteMedicine = async (id) => {
  try {
    const medicine = await Medicine.findOne({
      where: { id, bi_xoa: false },
    });

    if (!medicine) {
      throw new Error("Medicine not found");
    }

    medicine.bi_xoa = true;
    await medicine.save();

    return medicine;
  } catch (error) {
    throw new Error("Error deleting medicine: " + error.message);
  }
};
