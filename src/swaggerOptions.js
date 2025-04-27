const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Documentation for the backend API",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          ten_dang_nhap: { type: "string" },
          mat_khau: { type: "string" },
          gioi_tinh: { type: "string" },
          ho_va_ten: { type: "string" },
        },
      },
      UserCreate: {
        type: "object",
        required: ["ten_dang_nhap", "mat_khau", "gioi_tinh", "ho_va_ten"],
        properties: {
          ten_dang_nhap: { type: "string" },
          mat_khau: { type: "string" },
          gioi_tinh: { type: "string" },
          ho_va_ten: { type: "string" },
        },
      },
      UserUpdate: {
        type: "object",
        properties: {
          mat_khau: { type: "string" },
          gioi_tinh: { type: "string" },
          ho_va_ten: { type: "string" },
        },
      },
      Medicine: {
        type: "object",
        properties: {
          id: { type: "integer" },
          ten_thuoc: { type: "string" },
          mo_ta: { type: "string" },
          don_vi: { type: "string" },
          cong_dung: { type: "string" },
          cach_dung: { type: "string" },
          chong_chi_dinh: { type: "string" },
          url: { type: "string" },
          bi_xoa: { type: "boolean" },
        },
      },
      MedicineCreate: {
        type: "object",
        required: [
          "ten_thuoc",
          "mo_ta",
          "don_vi",
          "cong_dung",
          "cach_dung",
          "chong_chi_dinh",
        ],
        properties: {
          ten_thuoc: { type: "string" },
          mo_ta: { type: "string" },
          don_vi: { type: "string" },
          cong_dung: { type: "string" },
          cach_dung: { type: "string" },
          chong_chi_dinh: { type: "string" },
        },
      },
      MedicineUpdate: {
        type: "object",
        properties: {
          ten_thuoc: { type: "string" },
          mo_ta: { type: "string" },
          don_vi: { type: "string" },
          cong_dung: { type: "string" },
          cach_dung: { type: "string" },
          chong_chi_dinh: { type: "string" },
          url: { type: "string" },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
