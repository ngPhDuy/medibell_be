const express = require("express");
const router = express.Router();
const controller = require("../controllers/medicine.controller");

/**
 * @swagger
 * /api/medicine:
 *   get:
 *     summary: Lấy tất cả thuốc
 *     tags: [Medicine]
 *     responses:
 *       200:
 *         description: Danh sách thuốc
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicine'
 */
router.get("/", controller.getAllMedicines);

/**
 * @swagger
 * /api/medicine/{id}:
 *   get:
 *     summary: Lấy thông tin thuốc theo ID
 *     tags: [Medicine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chi tiết thuốc
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *       404:
 *         description: Không tìm thấy thuốc
 */
router.get("/:id", controller.getMedicineById);

/**
 * @swagger
 * /api/medicine:
 *   post:
 *     summary: Thêm thuốc mới
 *     tags: [Medicine]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicineCreate'
 *     responses:
 *       201:
 *         description: Tạo thuốc thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 */
router.post("/", controller.createMedicine);

/**
 * @swagger
 * /api/medicine/{id}:
 *   put:
 *     summary: Cập nhật thông tin thuốc
 *     tags: [Medicine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicineUpdate'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *       404:
 *         description: Không tìm thấy thuốc
 */
router.put("/:id", controller.updateMedicine);

module.exports = router;
