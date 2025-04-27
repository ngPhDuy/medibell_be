const { Sequelize } = require("sequelize");

const defineUser = require("./user.model");
const defineMedicine = require("./medicine.model");

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

//Thiết lập quan hệ giữa các model

module.exports = {
  sequelize,
  User,
  Medicine,
};
