const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Prescription",
    {
      id: {
        // ID đơn thuốc
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      id_nguoi_dung: {
        // ID người dùng
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Nguoi_dung",
          key: "id",
        },
      },
      ngay_bat_dau: {
        // Ngày bắt đầu
        type: DataTypes.DATE,
        allowNull: true,
      },
      ngay_ket_thuc: {
        // Ngày kết thúc
        type: DataTypes.DATE,
        allowNull: true,
      },
      trang_thai: {
        // Trạng thái đơn thuốc
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ten_don_thuoc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "Don_thuoc", // Tên bảng trong cơ sở dữ liệu
      timestamps: false, // Không sử dụng createdAt và updatedAt
    }
  );
};
