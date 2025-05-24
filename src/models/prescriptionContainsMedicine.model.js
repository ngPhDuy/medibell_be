// CREATE TABLE "Don_chua_thuoc" (
//     "thuoc" varchar(255) UNIQUE,
//   "id_don_thuoc" INTEGER,
//   "tong_so" INTEGER,
//   "buoi_uong" varchar(50), --[Sáng, Trưa, Chiều]
//   PRIMARY KEY ("id_thuoc", "id_don_thuoc")
// );

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "PrescriptionContainsMedicine",
    {
      thuoc: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      id_don_thuoc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Don_thuoc",
          key: "id",
        },
        primaryKey: true,
      },
      tong_so: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      buoi_uong: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      ghi_chu: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "Don_chua_thuoc",
      timestamps: false,
    }
  );
};
