const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ten_dang_nhap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mat_khau: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gioi_tinh: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      ho_va_ten: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avt_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "Nguoi_dung",
      timestamps: false,
    }
  );
};
