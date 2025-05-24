const express = require("express");
const router = express.Router();
const controller = require("../controllers/medicine.controller");

/**
 * @swagger
 * /api/medicines:
 *   get:
 *     summary: Lấy tất cả thuốc
 *     tags: [Medicines]
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách thuốc
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   ten_thuoc:
 *                     type: string
 *                     example: Paracetamol
 *                   mo_ta:
 *                     type: string
 *                     example: Thuốc giảm đau, hạ sốt
 *                   don_vi:
 *                     type: string
 *                     example: Viên
 *                   quy_che:
 *                     type: string
 *                     example: Giảm đau, hạ sốt
 *                   cach_dung:
 *                     type: string
 *                     example: Uống sau ăn
 *                   url:
 *                     type: string
 *                     example: https://cdn.nhathuoclongchau.com.vn/...jpg
 *                   bi_xoa:
 *                     type: boolean
 *                     example: false
 *                   id_nguoi_dung:
 *                     type: integer
 *                     example: 1
 *                   Thanh_phan:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ten_thanh_phan:
 *                           type: string
 *                           example: Paracetamol
 *                         ham_luong:
 *                           type: string
 *                           example: 500mg
 */
router.get("/", controller.getAllMedicines);

/**
 * @swagger
 * /api/medicines/{id}:
 *   get:
 *     summary: Lấy thông tin thuốc theo ID
 *     tags: [Medicines]
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 ten_thuoc:
 *                   type: string
 *                   example: Paracetamol
 *                 mo_ta:
 *                   type: string
 *                   example: Thuốc giảm đau, hạ sốt
 *                 don_vi:
 *                   type: string
 *                   example: Viên
 *                 quy_che:
 *                   type: string
 *                   example: Giảm đau, hạ sốt
 *                 cach_dung:
 *                   type: string
 *                   example: Uống sau ăn
 *                 url:
 *                   type: string
 *                   example: https://cdn.nhathuoclongchau.com.vn/...jpg
 *                 bi_xoa:
 *                   type: boolean
 *                   example: false
 *                 id_nguoi_dung:
 *                   type: integer
 *                   example: 1
 *                 Thanh_phan:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ten_thanh_phan:
 *                         type: string
 *                         example: Paracetamol
 *                       ham_luong:
 *                         type: string
 *                         example: 500mg
 *       404:
 *         description: Không tìm thấy thuốc
 */
router.get("/:id", controller.getMedicineById);

/**
 * @swagger
 * /api/medicines:
 *   post:
 *     summary: Thêm thuốc mới
 *     tags: [Medicines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ten_thuoc
 *               - mo_ta
 *               - don_vi
 *               - quy_che
 *               - cach_dung
 *               - id_nguoi_dung
 *               - Thanh_phan
 *             properties:
 *               ten_thuoc:
 *                 type: string
 *                 example: Paracetamol
 *               mo_ta:
 *                 type: string
 *                 example: Thuốc giảm đau, hạ sốt
 *               don_vi:
 *                 type: string
 *                 example: Viên
 *               quy_che:
 *                 type: string
 *                 example: Giảm đau, hạ sốt
 *               cach_dung:
 *                 type: string
 *                 example: Uống sau ăn
 *               url:
 *                 type: string
 *                 example: https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01841_7ea3c478cf.jpg
 *               id_nguoi_dung:
 *                 type: integer
 *                 example: 1
 *               Thanh_phan:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - ten_thanh_phan
 *                     - ham_luong
 *                   properties:
 *                     ten_thanh_phan:
 *                       type: string
 *                       example: Paracetamol
 *                     ham_luong:
 *                       type: string
 *                       example: 500mg
 *     responses:
 *       201:
 *         description: Tạo thuốc thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 ten_thuoc:
 *                   type: string
 *                   example: Paracetamol
 *                 mo_ta:
 *                   type: string
 *                   example: Thuốc giảm đau, hạ sốt
 *                 don_vi:
 *                   type: string
 *                   example: Viên
 *                 quy_che:
 *                   type: string
 *                   example: Giảm đau, hạ sốt
 *                 cach_dung:
 *                   type: string
 *                   example: Uống sau ăn
 *                 url:
 *                   type: string
 *                   example: https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01841_7ea3c478cf.jpg
 *                 id_nguoi_dung:
 *                   type: integer
 *                   example: 1
 *                 bi_xoa:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Lỗi khi tạo thuốc
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thiếu thông tin thuốc
 */
router.post("/", controller.createMedicine);

/**
 * @swagger
 * /api/medicines/{id}:
 *   put:
 *     summary: Cập nhật thông tin thuốc
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thuốc cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_thuoc:
 *                 type: string
 *                 example: Paracetamol
 *               mo_ta:
 *                 type: string
 *                 example: Thuốc giảm đau, hạ sốt
 *               don_vi:
 *                 type: string
 *                 example: Viên
 *               quy_che:
 *                 type: string
 *                 example: Hộp 15 viên
 *               cach_dung:
 *                 type: string
 *                 example: Uống sau ăn
 *               chong_chi_dinh:
 *                 type: string
 *                 example: Người bị bệnh gan
 *               url:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               Thanh_phan:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ten_thanh_phan:
 *                       type: string
 *                       example: Paracetamol
 *                     ham_luong:
 *                       type: string
 *                       example: 500mg
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 ten_thuoc:
 *                   type: string
 *                   example: Paracetamol
 *                 mo_ta:
 *                   type: string
 *                   example: Thuốc giảm đau, hạ sốt
 *                 don_vi:
 *                   type: string
 *                   example: Viên
 *                 quy_che:
 *                   type: string
 *                   example: Giảm đau, hạ sốt
 *                 cach_dung:
 *                   type: string
 *                   example: Uống sau ăn
 *                 chong_chi_dinh:
 *                   type: string
 *                   example: Người bị bệnh gan
 *                 url:
 *                   type: string
 *                   example: https://example.com/image.jpg
 *                 bi_xoa:
 *                   type: boolean
 *                   example: false
 *                 id_nguoi_dung:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Không tìm thấy thuốc
 *       500:
 *         description: Lỗi server
 */
router.put("/:id", controller.updateMedicine);

/**
 * @swagger
 * /api/medicines/{id}:
 *   delete:
 *     summary: Xoá mềm thuốc theo ID (chỉ đặt cờ `bi_xoa` = true)
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thuốc cần xoá
 *     responses:
 *       200:
 *         description: Xoá thuốc thành công (đánh dấu bi_xoa = true)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 ten_thuoc:
 *                   type: string
 *                   example: Paracetamol
 *                 bi_xoa:
 *                   type: boolean
 *                   example: true
 *                 id_nguoi_dung:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Không tìm thấy thuốc
 *       500:
 *         description: Lỗi server
 */
router.delete("/:id", controller.deleteMedicine);

module.exports = router;
