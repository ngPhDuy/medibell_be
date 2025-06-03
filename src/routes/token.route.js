const express = require("express");
const router = express.Router();
const controller = require("../controllers/token.controller.js");

/**
 * @swagger
 * /api/tokens/user/{userID}:
 *   post:
 *     summary: Lưu token thông báo đẩy cho thiết bị của người dùng
 *     tags:
 *       - Notification Token
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "10"
 *                 description: Mã token dùng cho thông báo đẩy (push notification)
 *     responses:
 *       200:
 *         description: Token đã được lưu thành công
 *         content:
 *           application/json:
 *             example:
 *               id: 4
 *               token: "10"
 *               thiet_bi: "iphone1"
 *               id_nguoi_dung: 7
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ hoặc thiếu token
 *       500:
 *         description: Lỗi server
 */
router.post("/user/:userID", controller.createTokenByUserAndDevice);

module.exports = router;
