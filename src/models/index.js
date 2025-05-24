const { Sequelize } = require("sequelize");

const defineUser = require("./user.model");
const defineMedicine = require("./medicine.model");
const defineIngredient = require("./ingredient.model");
const definePrescription = require("./prescription.model");
const definePrescriptionContainsMedicine = require("./prescriptionContainsMedicine.model");
const defineMedicationSchedule = require("./medicationSchedule.model");
const defineMedicineInSingleDose = require("./medicineInSingleDose.model");

require("dotenv").config();
//Kết nối đến neon.tech
const sequelize = new Sequelize({
  dialect: "postgres",
  timezone: process.env.DB_TIMEZONE, // Lấy timezone từ .env
  host: process.env.DB_HOST, // Lấy host từ .env
  database: process.env.DB_NAME, // Lấy tên database từ .env
  username: process.env.DB_USERNAME, // Lấy username từ .env
  password: process.env.DB_PASSWORD, // Lấy password từ .env
  port: process.env.DB_PORT, // Lấy port từ .env
  dialectModule: require("pg"),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

console.log("Kết nối đến cơ sở dữ liệu thành công!");

//Đinh nghĩa các model
const User = defineUser(sequelize);
const Medicine = defineMedicine(sequelize);
const Ingredient = defineIngredient(sequelize);
const Prescription = definePrescription(sequelize);
const PrescriptionContainsMedicine =
  definePrescriptionContainsMedicine(sequelize);
const MedicationSchedule = defineMedicationSchedule(sequelize);
const MedicineInSingleDose = defineMedicineInSingleDose(sequelize);

//Các quan hệ
Medicine.belongsTo(User, {
  foreignKey: "id_nguoi_dung",
  targetKey: "id",
  as: "Nguoi_dung",
});

User.hasMany(Medicine, {
  foreignKey: "id_nguoi_dung",
  sourceKey: "id",
  as: "Thuoc",
});

Prescription.belongsTo(User, {
  foreignKey: "id_nguoi_dung",
  targetKey: "id",
  as: "Nguoi_dung",
});

User.hasMany(Prescription, {
  foreignKey: "id_nguoi_dung",
  sourceKey: "id",
  as: "Don_thuoc",
});

PrescriptionContainsMedicine.belongsTo(Prescription, {
  foreignKey: "id_don_thuoc",
  targetKey: "id",
  as: "Don_thuoc",
});

Prescription.hasMany(PrescriptionContainsMedicine, {
  foreignKey: "id_don_thuoc",
  sourceKey: "id",
  as: "Don_chua_thuoc",
});

MedicationSchedule.belongsTo(Prescription, {
  foreignKey: "don_thuoc",
  targetKey: "id",
  as: "Don_thuoc",
});

Prescription.hasMany(MedicationSchedule, {
  foreignKey: "don_thuoc",
  sourceKey: "id",
  as: "Lan_uong",
});

Ingredient.belongsTo(Medicine, {
  foreignKey: "thuoc_id",
  targetKey: "id",
  as: "Thuoc",
});

Medicine.hasMany(Ingredient, {
  foreignKey: "thuoc_id",
  sourceKey: "id",
  as: "Thanh_phan",
});

MedicineInSingleDose.belongsTo(Medicine, {
  foreignKey: "thuoc",
  targetKey: "id",
  as: "Thuoc",
});

MedicineInSingleDose.belongsTo(MedicationSchedule, {
  foreignKey: "id_lan_uong",
  targetKey: "id",
  as: "Lan_uong",
});

MedicationSchedule.hasMany(MedicineInSingleDose, {
  foreignKey: "id_lan_uong",
  sourceKey: "id",
  as: "Thuoc_trong_mot_lan_uong",
});

Medicine.hasMany(MedicineInSingleDose, {
  foreignKey: "thuoc",
  sourceKey: "id",
  as: "Thuoc_trong_mot_lan_uong",
});

//Thiết lập quan hệ giữa các model

module.exports = {
  sequelize,
  User,
  Medicine,
  Ingredient,
  Prescription,
  PrescriptionContainsMedicine,
  MedicationSchedule,
  MedicineInSingleDose,
};
