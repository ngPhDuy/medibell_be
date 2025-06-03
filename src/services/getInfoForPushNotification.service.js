const { sequelize } = require("../models");

exports.getMedicineSchedule = async () => {
  try {
    const callFunction = sequelize.query(
      `SELECT * FROM get_medicine_notifications()`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return callFunction;
  } catch (error) {
    console.error("Lỗi khi gọi hàm get_medicine_notifications:", error);
    return null;
  }
};
