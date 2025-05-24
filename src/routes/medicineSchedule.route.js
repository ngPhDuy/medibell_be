const express = require("express");
const router = express.Router();
const controller = require("../controllers/medicineSchedule.controller");

/**
 * @swagger
 * /api/medicine_schedules:
 *   post:
 *     summary: Tạo lịch uống thuốc (đơn thuốc và chi tiết thuốc)
 *     tags:
 *       - Medicine Schedules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_nguoi_dung
 *               - ngay_bat_dau
 *               - ngay_ket_thuc
 *               - ten_don_thuoc
 *               - Don_chua_thuoc
 *             properties:
 *               id_nguoi_dung:
 *                 type: integer
 *                 description: ID của người dùng
 *                 example: 123
 *               ngay_bat_dau:
 *                 type: string
 *                 format: date
 *                 description: Ngày bắt đầu uống thuốc
 *                 example: "2025-05-24"
 *               ngay_ket_thuc:
 *                 type: string
 *                 format: date
 *                 description: Ngày kết thúc uống thuốc
 *                 example: "2025-05-30"
 *               ten_don_thuoc:
 *                 type: string
 *                 description: Tên của đơn thuốc
 *                 example: "Đơn thuốc huyết áp"
 *               Don_chua_thuoc:
 *                 type: array
 *                 minItems: 1
 *                 description: Danh sách thuốc trong đơn
 *                 items:
 *                   type: object
 *                   required:
 *                     - thuoc
 *                     - tong_so
 *                     - buoi_uong
 *                   properties:
 *                     thuoc:
 *                       type: integer
 *                       description: ID của thuốc
 *                       example: 5
 *                     tong_so:
 *                       type: number
 *                       description: Tổng số viên/liều thuốc cần dùng
 *                       example: 30
 *                     buoi_uong:
 *                       type: string
 *                       description: Danh sách các buổi uống cách nhau bởi dấu phẩy Sáng, Trưa, Chiều
 *                       example: "Sáng, Chiều"
 *                     ghi_chu:
 *                       type: string
 *                       description: Ghi chú thêm (nếu có)
 *                       example: "Uống sau khi ăn"
 *     responses:
 *       201:
 *         description: Tạo đơn thuốc thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 101
 *                 id_nguoi_dung:
 *                   type: integer
 *                   example: 123
 *                 ngay_bat_dau:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-24"
 *                 ngay_ket_thuc:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-30"
 *                 ten_don_thuoc:
 *                   type: string
 *                   example: "Đơn thuốc huyết áp"
 *       400:
 *         description: Thiếu trường dữ liệu bắt buộc hoặc dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi phía máy chủ
 */
router.post("/", controller.createMedicineSchedule);

/**
 * @swagger
 * /api/medicine_schedules:
 *   get:
 *     summary: Lấy danh sách đơn thuốc theo người dùng và khoảng thời gian
 *     description: Trả về danh sách các đơn thuốc của người dùng trong khoảng thời gian được chỉ định.
 *     tags:
 *       - Medicine Schedules
 *     parameters:
 *       - in: query
 *         name: userID
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: ID của người dùng (bắt buộc)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-05-24"
 *         required: true
 *         description: Ngày bắt đầu lọc đơn thuốc (định dạng YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-05-25"
 *         required: true
 *         description: Ngày kết thúc lọc đơn thuốc (định dạng YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Thành công, trả về mảng các đơn thuốc cùng lịch uống thuốc
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 18
 *                   id_nguoi_dung:
 *                     type: integer
 *                     example: 1
 *                   ngay_bat_dau:
 *                     type: string
 *                     format: date
 *                     example: "2025-05-24"
 *                   ngay_ket_thuc:
 *                     type: string
 *                     format: date
 *                     example: "2025-05-25"
 *                   trang_thai:
 *                     type: string
 *                     example: "Đang chờ"
 *                   ten_don_thuoc:
 *                     type: string
 *                     example: "Đơn thuốc huyết áp"
 *                   Lan_uong:
 *                     type: array
 *                     description: Danh sách các lần uống thuốc kèm thông tin chi tiết
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 16
 *                         gio:
 *                           type: string
 *                           format: time
 *                           example: "06:00:00"
 *                         ngay:
 *                           type: string
 *                           format: date
 *                           example: "2025-05-24"
 *                         don_thuoc:
 *                           type: integer
 *                           example: 18
 *                         thoi_diem_da_uong:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                           example: null
 *                         buoi_uong:
 *                           type: string
 *                           example: "Sáng"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/", controller.getMedicineSchedules);

/**
 * @swagger
 * /api/medicine_schedules/toggle/{id}:
 *   get:
 *     summary: Bật hoặc tắt trạng thái đã uống thuốc
 *     description:
 *       Bật trạng thái đã uống thuốc nếu lần uống chưa được ghi nhận.
 *       Tắt trạng thái nếu đã ghi nhận (tức là reset lại `thoi_diem_da_uong` về null).
 *     tags:
 *       - Medicine Schedules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 16
 *         description: ID của lần uống thuốc cần thay đổi trạng thái
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin sau khi cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 16
 *                 gio:
 *                   type: string
 *                   format: time
 *                   example: "06:00:00"
 *                 ngay:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-24"
 *                 don_thuoc:
 *                   type: integer
 *                   example: 18
 *                 thoi_diem_da_uong:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   example: "2025-05-24T06:00:00.000Z"
 *                 buoi_uong:
 *                   type: string
 *                   example: "Sáng"
 *       404:
 *         description: Không tìm thấy lần uống thuốc với ID đã cho
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule not found"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/toggle/:id", controller.toggleMedicineSchedule);

/**
 * @swagger
 * /api/medicine_schedules/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một lần uống thuốc theo ID
 *     description: Trả về thông tin chi tiết của một lần uống thuốc, bao gồm danh sách thuốc trong lần uống và thông tin đơn thuốc liên quan.
 *     tags:
 *       - Medicine Schedules
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           example: 16
 *         required: true
 *         description: ID của lần uống thuốc cần lấy thông tin
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin chi tiết lần uống thuốc
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 16
 *                 gio:
 *                   type: string
 *                   format: time
 *                   example: "06:00:00"
 *                 ngay:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-24"
 *                 don_thuoc:
 *                   type: integer
 *                   example: 18
 *                 thoi_diem_da_uong:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 buoi_uong:
 *                   type: string
 *                   example: "Sáng"
 *                 Thuoc_trong_mot_lan_uong:
 *                   type: array
 *                   description: Danh sách thuốc trong lần uống này
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 15
 *                       id_lan_uong:
 *                         type: integer
 *                         example: 16
 *                       thuoc:
 *                         type: string
 *                         example: "Panadol"
 *                       so_luong:
 *                         type: integer
 *                         example: 3
 *                 Don_thuoc:
 *                   type: object
 *                   description: Thông tin đơn thuốc liên quan
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 18
 *                     id_nguoi_dung:
 *                       type: integer
 *                       example: 1
 *                     ngay_bat_dau:
 *                       type: string
 *                       format: date
 *                       example: "2025-05-24"
 *                     ngay_ket_thuc:
 *                       type: string
 *                       format: date
 *                       example: "2025-05-25"
 *                     trang_thai:
 *                       type: string
 *                       example: "Đang chờ"
 *                     ten_don_thuoc:
 *                       type: string
 *                       example: "Đơn thuốc huyết áp"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/:id", controller.getMedicineSchedulesById);

module.exports = router;
